from singhit_app.core.config import settings

logo_url = "https://th.bing.com/th/id/OIP.8mVa_PdHs5buO_Ip2tVcZgHaDP?rs=1&pid=ImgDetMain"

def verify_email(firstname, verify_link):
    mail_body = f"""
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <img src="{logo_url}" alt="SinghIT Logo" style="max-width: 150px; height: auto;">
                </div>
                <h3 style="color: #007bff; text-align: center;">Your Account Verification for SinghIT Platform</h3>
                <p style="font-size: 16px; line-height: 1.5;">
                    Hello, <strong>{firstname}</strong>!
                </p>
                <p style="font-size: 16px; line-height: 1.5;">
                    You have one step to complete your account setup on SinghIT Platform. Click the button below to verify your account:
                </p>
                <div style="text-align: center; margin: 20px 0;">
                    <a href="{verify_link}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; font-size: 16px; border-radius: 5px;">
                        Verify Account
                    </a>
                </div>
                <p style="font-size: 14px; color: #888;">
                    If you didn't request this, you can safely ignore this email. This verification link will expire after <strong>{settings.password_token_expire_mins}</strong> minutes.
                </p>
                <p style="font-size: 14px; line-height: 1.5;">
                    Best regards, <br />
                    The SinghIT Team
                </p>
            </div>
        """
    
    return mail_body

def password_reset_email(firstname, reset_link):
    mail_body = f"""
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="{logo_url}" alt="SinghIT Logo" style="max-width: 150px; height: auto;">
            </div>
            <h3 style="color: #007bff; text-align: center;">Password Reset Request for SinghIT Platform</h3>
            <p style="font-size: 16px; line-height: 1.5;">
                Hello, <strong>{firstname}</strong>!
            </p>
            <p style="font-size: 16px; line-height: 1.5;">
                You requested a password reset for your account on the SinghIT Platform. Click the button below to reset your password:
            </p>
            <div style="text-align: center; margin: 20px 0;">
                <a href="{reset_link}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; font-size: 16px; border-radius: 5px;">
                    Reset Password
                </a>
            </div>
            <p style="font-size: 14px; color: #888;">
                If you didn't request this, you can safely ignore this email. This password reset request will expire after <strong>{settings.password_token_expire_mins}</strong> minutes.
            </p>
            <p style="font-size: 14px; line-height: 1.5;">
                Best regards, <br />
                The SinghIT Team
            </p>
        </div>
    """

    return mail_body