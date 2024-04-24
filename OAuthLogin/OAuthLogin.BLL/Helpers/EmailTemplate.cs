using System.Text;

namespace OAuthLogin.BLL.Helpers
{
    public class EmailTemplate
    {
        public static string UserConfirmationMail(string userName, string confirmationLink)
        {
            var message = new StringBuilder();
            message.AppendFormat(@"
                    <html>
                    <head>
                        <title>Confirmation Mail</title>
                    </head>
                    <body>
                        <p>Hi {0},</p>
                        <p>In order to start using your new account, you need to confirm your email address.</p>
                        <p>Please confirm your email by clicking <a href='{1}'>here</a>.</p>
                        <p>If you did not sign up for this account, you can ignore this email and the account will be deleted.</p>
                    </body>
                    </html>", userName, confirmationLink);
            return message.ToString();
        }

        public static string PasswordResetMail(string userName, string resetLink)
        {
            var message = new StringBuilder();

            message.AppendFormat(@"<html>
                    <head>
                        <title>Password Reset Mail</title>
                    </head>
                    <body>
                        <p>Hi {0},</p>
                        <p>In order to change your password, you need to click on the below link.</p>
                        <p>This link will redirect you to the password reset page <a href='{1}'>Click here</a>.</p>
                        <p>If you did not sign up for this account, you can ignore this email and the account will be deleted.</p>
                    </body>
                    </html>", userName, resetLink);
            return message.ToString();
        }

        public static string AddUserConfirmationMail(string userName, string confirmationLink)
        {
            var message = new StringBuilder();
            message.AppendFormat(@"
                    <html>
                    <head>
                        <title>Confirmation Mail</title>
                    </head>
                    <body>
                        <p>Hi {0},</p>
                        <p>In order to start using your new account, you need to confirm your email address.</p>
                        <p>Please confirm your email by clicking <a href='{1}'>here</a>.</p>
                        
                    </body>
                    </html>", userName, confirmationLink);
            return message.ToString();
        }

    }
}
