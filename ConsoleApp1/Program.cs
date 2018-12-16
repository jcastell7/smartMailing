using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using data;

using System.Net.Mail;

namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            /*SmtpClient client = new SmtpClient();
            client.Port = 587;
            client.Host = "smtp.gmail.com";
            client.EnableSsl = true;
            client.Timeout = 10000;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.Credentials = new System.Net.NetworkCredential("jcsanchezv1998@gmail.com", "Anta9804");

            MailMessage mm = new MailMessage("jtcp27031@gmail.com", "antablack89@gmail.com", "tes1t", "test1");
            mm.BodyEncoding = UTF8Encoding.UTF8;
            mm.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;
            client.Send(mm);*/
            var connect = Connection.getInstance();
            
            //if (System.Diagnostics.Debugger.IsAttached) Console.ReadLine();
        }
    }
}
