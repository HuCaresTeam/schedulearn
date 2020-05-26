using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using SchedulearnBackend.UserFriendlyExceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
            var messageText = $"Hi {userName},<br/>Your manager {managerName} asked You to join his team in Schedulearn app.<br/>Please complete the registration here: <a href=\"{ linkToRegister }\">Registartion to Schedulearn</a>";
            await SendEmailAsync(receiverEmail, "Registration to Schedulearn", messageText);
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
                throw new EmailException($"Error sending email to {receiverEmail}: {e.Message}");
            }
        }
    }
}
