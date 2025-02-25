import mailchimp from '@mailchimp/mailchimp_marketing';

// Initialize Mailchimp client
mailchimp.setConfig({
  apiKey: import.meta.env.VITE_MAILCHIMP_API_KEY,
  server: import.meta.env.VITE_MAILCHIMP_SERVER_PREFIX
});

const listId = import.meta.env.VITE_MAILCHIMP_LIST_ID;

export async function addSubscriber(email: string) {
  try {
    // Hash the email for the subscriber lookup
    const subscriberHash = email
      .toLowerCase()
      .split('')
      .reduce((hash, char) => ((hash << 5) - hash) + char.charCodeAt(0), 0)
      .toString(36);

    // Try to add the subscriber
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {}
    });

    return response;
  } catch (error: any) {
    // Check if the error is because the member already exists
    if (error.status === 400 && error.response?.text?.includes('Member Exists')) {
      console.log('Subscriber already exists');
      return null;
    }
    throw error;
  }
}

export async function sendNewsletterEmail(publication: {
  title: string;
  content: string;
  imageUrl: string;
  category: string;
}) {
  try {
    // Create campaign with proper error handling
    const campaignResponse = await mailchimp.campaigns.create({
      type: 'regular',
      recipients: {
        list_id: listId,
        segment_opts: {
          match: 'all',
          conditions: [{
            condition_type: 'Interests',
            field: 'interests-categories',
            op: 'interestcontains',
            value: [publication.category]
          }]
        }
      },
      settings: {
        subject_line: `Nouvelle publication: ${publication.title}`,
        preview_text: publication.content.substring(0, 150),
        title: publication.title,
        from_name: 'Avolta Belgique',
        reply_to: 'contact@avolta.be',
        auto_footer: true
      }
    });

    // Set campaign content with error handling
    await mailchimp.campaigns.setContent(campaignResponse.id, {
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${publication.title}</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #6A0DAD; margin-bottom: 20px;">${publication.title}</h1>
            <img src="${publication.imageUrl}" alt="${publication.title}" style="max-width: 100%; height: auto; margin: 20px 0; border-radius: 8px;">
            <p style="margin-bottom: 15px;"><strong>Catégorie:</strong> ${publication.category}</p>
            <div style="margin-bottom: 30px;">${publication.content}</div>
            <div style="text-align: center;">
              <a href="https://avolta.be/news/${publication.title.toLowerCase().replace(/\s+/g, '-')}" 
                 style="display: inline-block; background-color: #6A0DAD; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Lire la suite
              </a>
            </div>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px; text-align: center;">
              Vous recevez cet email car vous êtes abonné à la newsletter d'Avolta Belgique.<br>
              Pour vous désabonner, <a href="*|UNSUB|*" style="color: #6A0DAD;">cliquez ici</a>
            </p>
          </body>
        </html>
      `
    });

    // Send the campaign with error handling
    await mailchimp.campaigns.send(campaignResponse.id);

    return campaignResponse;
  } catch (error: any) {
    // Log detailed error information
    console.error('Mailchimp API Error:', {
      status: error.status,
      title: error.title,
      detail: error.detail,
      response: error.response?.text
    });
    throw new Error('Erreur lors de l\'envoi de la newsletter. Veuillez réessayer plus tard.');
  }
}