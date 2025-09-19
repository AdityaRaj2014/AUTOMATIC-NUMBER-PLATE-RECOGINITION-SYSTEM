from flask_mail import Mail,Message
import os
def configure_mail(app):
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USERNAME'] = os.getenv("MAIL_USERNAME")
    app.config['MAIL_PASSWORD'] =  os.getenv("MAIL_PASSWORD")
    app.config['MAIL_DEFAULT_SENDER'] = os.getenv("MAIL_DEFAULT_SENDER")  
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USE_SSL'] = False
    return Mail(app)

def send_contact_email(mail,name,email,message):
    try:
        msg  = Message(
            subject=f"ANPR Message from {name}",
            sender=email,
            recipients=[os.getenv("MAIL_USERNAME")],
            body=f"Name: {name}\nEmail: {email}\nMessage: {message}"
        )
        mail.send(msg)
        print(f"Sending email to {os.getenv('MAIL_USERNAME')} from {email}")
        return True, None 
    except Exception as e:
        print(f"Error sending email:{str(e)}")
        return False,"Failed to send email.try again later"