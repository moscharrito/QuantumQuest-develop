import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import formataddr
from typing import List
from singhit_app.core.config import settings

class MailService:
    def __init__(
            self, 
            smtp_server: str, 
            smtp_port: int, 
            smtp_user: str, 
            smtp_password: str, 
            from_email: str, 
            from_name: str
        ):
        
        self.smtp_server = smtp_server
        self.smtp_port = smtp_port
        self.smtp_user = smtp_user
        self.smtp_password = smtp_password
        self.from_email = from_email
        self.from_name = from_name

    def send_email(self, to_emails: List[str], subject: str, body: str):
        try:
            message = MIMEMultipart()
            message['From'] = formataddr((self.from_name, self.from_email))
            message['To'] = ', '.join(to_emails)
            message['Subject'] = subject
            message.attach(MIMEText(body, 'html'))

            if 'prod' in settings.env:
                with smtplib.SMTP_SSL(self.smtp_server, self.smtp_port) as server:
                    server.login(self.smtp_user, self.smtp_password)
                    server.sendmail(self.from_email, to_emails, message.as_string())

            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.login(self.smtp_user, self.smtp_password)
                server.sendmail(self.from_email, to_emails, message.as_string())

        except Exception as e:
            raise RuntimeError(f"Failed to send email: {e}")