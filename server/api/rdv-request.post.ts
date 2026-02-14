import { Resend } from "resend";
import { decryptPayload } from "~/utils/decrypt";


export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const secret = config.public.cryptoSecrect;
    const { payload } = await readBody(event);
    const data = decryptPayload(payload, secret)
    console.log("data_name", data.name, data)

    const resend = new Resend(config.resendApiKey);



    try {
        const response = await resend.emails.send({
            from: `onboarding@resend.dev`,
            /* Utiliser le mail qui est rattaché à resend */
            to: config.email,
            replyTo: data.email,
            subject: `Nouveau message - ${data.subject || 'Contact'}`,
            html: `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style>
        body { margin: 0 !important; padding: 0 !important; }
        @media only screen and (max-width: 600px) {
            .header-title { font-size: 20px !important; }
            .content-text { font-size: 15px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #000000;">
    
    <!-- Header pleine largeur -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <tr>
            <td style="padding: 30px 20px; text-align: center;">
                <h1 class="header-title" style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: 1px;">
                    TABERNACLE OF HALLEL
                </h1>
            </td>
        </tr>
    </table>
    
    <!-- Badge notification -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #1a1a1a;">
        <tr>
            <td style="padding: 20px 15px 10px;">
                <div style="background-color: #1e3a5f; border-left: 4px solid #667eea; padding: 12px 15px; border-radius: 5px;">
                    <p style="margin: 0; color: #8ab4f8; font-size: 15px; font-weight: 600;">
                        📬 Nouveau message reçu
                    </p>
                </div>
            </td>
        </tr>
    </table>
    
    <!-- Contenu principal -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #1a1a1a;">
        <tr>
            <td style="padding: 10px 15px 20px;">
                
                <!-- Nom -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 15px;">
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #333;">
                            <div style="color: #999; font-size: 14px; margin-bottom: 4px;">👤 NOM</div>
                            <div class="content-text" style="color: #e8eaed; font-size: 16px; font-weight: 500;">${data.name}</div>
                        </td>
                    </tr>
                </table>
                
                <!-- Email -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 15px;">
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #333;">
                            <div style="color: #999; font-size: 14px; margin-bottom: 4px;">✉️ EMAIL</div>
                            <div class="content-text" style="color: #8ab4f8; font-size: 16px; font-weight: 500;">
                                <a href="mailto:${data.email}" style="color: #8ab4f8; text-decoration: none;">${data.email}</a>
                            </div>
                        </td>
                    </tr>
                </table>
                
                <!-- Téléphone -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 15px;">
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #333;">
                            <div style="color: #999; font-size: 14px; margin-bottom: 4px;">📞 TÉLÉPHONE</div>
                            <div class="content-text" style="color: #e8eaed; font-size: 16px; font-weight: 500;">${data.phone || 'Non fourni'}</div>
                        </td>
                    </tr>
                </table>
                
                <!-- Sujet -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 15px;">
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #333;">
                            <div style="color: #999; font-size: 14px; margin-bottom: 4px;">📋 SUJET</div>
                            <div class="content-text" style="color: #e8eaed; font-size: 16px; font-weight: 500;">${data.subject || 'Aucun sujet'}</div>
                        </td>
                    </tr>
                </table>
                
                <!-- Date -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 15px;">
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #333;">
                            <div style="color: #999; font-size: 14px; margin-bottom: 4px;">📅 DATE</div>
                            <div class="content-text" style="color: #e8eaed; font-size: 16px; font-weight: 500;">${data.date || 'Non spécifiée'}</div>
                        </td>
                    </tr>
                </table>
                
                <!-- Heure -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 15px;">
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #333;">
                            <div style="color: #999; font-size: 14px; margin-bottom: 4px;">🕐 HEURE</div>
                            <div class="content-text" style="color: #e8eaed; font-size: 16px; font-weight: 500;">${data.hour}:${String(data.minute).padStart(2, '0')} ${data.ampm}</div>
                        </td>
                    </tr>
                </table>
                
                <!-- Message -->
                <div style="margin-top: 20px;">
                    <div style="color: #999; font-size: 14px; margin-bottom: 8px;">💬 MESSAGE</div>
                    <div style="background-color: #2d2d2d; border-radius: 8px; padding: 15px; border-left: 3px solid #667eea;">
                        <p class="content-text" style="margin: 0; color: #e8eaed; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
                    </div>
                </div>
                
            </td>
        </tr>
    </table>
    
    <!-- Footer -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0f0f0f; border-top: 1px solid #333;">
        <tr>
            <td style="padding: 20px 15px; text-align: center;">
                <p style="margin: 0 0 8px; color: #999; font-size: 12px; line-height: 1.4;">
                    Message envoyé depuis le formulaire de contact
                </p>
            </td>
        </tr>
    </table>
    
</body>
</html>
            `,
        });
        console.log("response", response)
        return { success: !!response?.data?.id };
    } catch (error) {
        console.error(error);
        return { success: false };
    }
});

