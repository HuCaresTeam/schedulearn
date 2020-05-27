using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using SchedulearnBackend.Extensions;
using SchedulearnBackend.UserFriendlyExceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static SchedulearnBackend.Properties.Resources;

namespace SchedulearnBackend.Services
{
    public class EmailService
    {
        private readonly EmailSettings _emailSettings;

        public EmailService(IOptions<EmailSettings> emailSettings)
        {
            _emailSettings = emailSettings.Value;
        }

        public async Task SendRegistrationEmail(string receiverEmail, string userName, string managerName, string linkToRegister)
        {
            var subjectText = Email_SubjectText;
            var bodyText = Email_BodyText.ReplaceArgs(userName, managerName, linkToRegister);
            System.Diagnostics.Debug.WriteLine($"Body text: {bodyText}");
            await SendEmailAsync(receiverEmail, subjectText, bodyText);
        }

        private async Task SendEmailAsync(string receiverEmail, string subject, string message)
        {
            try
            {
                var mimeMessage = new MimeMessage();

                mimeMessage.From.Add(new MailboxAddress(_emailSettings.SenderName, _emailSettings.Sender));
                mimeMessage.To.Add(new MailboxAddress(receiverEmail));
                mimeMessage.Subject = subject;
                mimeMessage.Body = new TextPart("html")
                {
                    Text = message
                };

                using (var client = new SmtpClient())
                {
                    await client.ConnectAsync(_emailSettings.MailServer, _emailSettings.MailPort, true);
                    await client.AuthenticateAsync(_emailSettings.Sender, _emailSettings.Password);
                    await client.SendAsync(mimeMessage);
                    await client.DisconnectAsync(true);
                }

            }
            catch (Exception e)
            {
                throw new EmailException(Error_EmailNotSent.ReplaceArgs(receiverEmail), e);
            }
        }
    }
}
