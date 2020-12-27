package com.company;

import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class Main {
    static String hostMailAddress = "info@svopir.ir";
    static String hostMailServer = "localhost";
    public void sendTokenToMail(String mail,String selector, String token) {
        try {

            String to = mail;

//            String from = hostMailAddress;
//
//            String host = hostMailServer;
            String from = "nimip0344@gmail.com";
            String host = "smtp.gmail.com";

            Properties properties = System.getProperties();
            properties.put("mail.smtp.host", host);
            properties.put("mail.smtp.port", "465");
            properties.put("mail.smtp.ssl.enable", "true");
            properties.put("mail.smtp.auth", "true");

            Session session = Session.getInstance(properties, new javax.mail.Authenticator() {

                protected PasswordAuthentication getPasswordAuthentication() {

                    return new PasswordAuthentication("nimip0344@gmail.com", "3i7#5in@4v%B562@hbT%$,b52rfecTG%$2ert3i7#5in@4v%B562@hbT%$,b52rfecTG%$2ert");

                }

            });



            MimeMessage message = new MimeMessage(session);

            message.setFrom(new InternetAddress(from));

            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));

            message.setSubject("noReply - بازیابی رمز عبور","UTF-8");

            message.setContent(String.format("<div style=\"width: 300px; height: 100px; border: 5px solid yellowgreen; padding: 5px\">\n" +
                    "<p style=\"text-align: right\">برای بازیابی رمز عبور خود روی لینک زیر کلیک کنید</p>\n" +
                    "<a href='http://svopir.ir/newPassword.jsp?selector=%s&token=%s' style=\"text-align: right\">بازیابی</a>\n" +
                    "</div>",selector,token), "text/html; charset=UTF-8");

            Transport.send(message);
        }
        catch(Exception e) {
            e.printStackTrace();
        }

    }
    public static void main(String[] args) {
        Main main = new Main();
        main.sendTokenToMail("pn2120551@gmail.com", "34tv3ct3t", "45tc45t45ctx5tc4");
    }
}
