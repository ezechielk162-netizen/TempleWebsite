import { Resend } from "resend";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const body = await readBody(event);
    const resend = new Resend(config.resendApiKey);

    console.log("config.email", config.email);

    try {
        const response = await resend.emails.send({
            from: `onboarding@resend.dev`,
            /* Utiliser le mail qui est rattaché à resend */
            to: config.email,
            replyTo: body.email,
            subject: `Nouveau message - ${body.subject || 'Contact'}`,
            html: `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Arial', 'Helvetica', sans-serif; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    
                    <!-- Header avec dégradé -->
                    <tr>
                        <td style="background:  #0a2240 0%; padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 17px; font-weight: 700; letter-spacing: 1px;">
                                TABERNACLE OF HALLEL
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Badge de notification -->
                    <tr>
                        <td style="padding: 30px 30px 10px;">
                            <div style="background-color: #f0f7ff; border-left: 4px solid #667eea; padding: 15px 20px; border-radius: 5px;">
                                <p style="margin: 0; color: #667eea; font-size: 16px; font-weight: 600;">
                                    📬 Nouveau message
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Contenu principal -->
                    <tr>
                        <td style="padding: 20px 30px;">
                            
                            <!-- Informations de contact -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 25px;">
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td width="30%" style="color: #666; font-size: 14px; font-weight: 600;">
                                                    👤 Nom
                                                </td>
                                                <td style="color: #333; font-size: 14px;">
                                                    ${body.name}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td width="30%" style="color: #666; font-size: 14px; font-weight: 600;">
                                                    ✉️ Email
                                                </td>
                                                <td style="color: #667eea; font-size: 14px;">
                                                    <a href="mailto:${body.email}" style="color: #667eea; text-decoration: none;">
                                                        ${body.email}
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td width="30%" style="color: #666; font-size: 14px; font-weight: 600;">
                                                    📞 Téléphone
                                                </td>
                                                <td style="color: #333; font-size: 14px;">
                                                    ${body.phone || 'Non fourni'}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td width="30%" style="color: #666; font-size: 14px; font-weight: 600;">
                                                    📋 Sujet
                                                </td>
                                                <td style="color: #333; font-size: 14px;">
                                                    ${body.subject || 'Aucun sujet'}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td width="30%" style="color: #666; font-size: 14px; font-weight: 600;">
                                                    📅 Date
                                                </td>
                                                <td style="color: #333; font-size: 14px;">
                                                    ${body.date || 'Non spécifiée'}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td width="30%" style="color: #666; font-size: 14px; font-weight: 600;">
                                                    🕐 Heure
                                                </td>
                                                <td style="color: #333; font-size: 14px;">
                                                    ${body.hour}:${String(body.minute).padStart(2, '0')} ${body.ampm}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Message -->
                            <div style="margin-top: 25px;">
                                <h3 style="color: #667eea; font-size: 16px; margin: 0 0 15px; font-weight: 600;">
                                    💬 Message
                                </h3>
                                <div style="background-color: #f9f9f9; border-radius: 8px; padding: 20px; line-height: 1.6;">
                                    <p style="margin: 0; color: #333; font-size: 14px; white-space: pre-wrap;">${body.message}</p>
                                </div>
                            </div>
                            
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 25px 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                            <p style="margin: 0 0 10px; color: #666; font-size: 13px;">
                                Ce message a été envoyé depuis le formulaire de contact du site web
                            </p>
                            <p style="margin: 0; color: #999; font-size: 12px;">
                                © 2024 Tabernacle of Hallel - Tous droits réservés
                            </p>
                            <div style="margin-top: 15px;">
                                <span style="color: #764ba2; font-size: 20px;">🙏</span>
                            </div>
                        </td>
                    </tr>
                    
                </table>
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