import { createTransport } from 'nodemailer';
import { scheduleJob } from 'node-schedule';

/**
 * google帳號啟用兩階段驗證後，必須使用應用程式密碼才能發信!!
 * 設定方法: https://myaccount.google.com/apppasswords
 */

// 設定你的郵件傳送器
const transporter = createTransport({
  service: 'gmail',  // 你的郵件服務提供商
  auth: {  
    user: 'xxx@gmail.com',  // 你的郵件(google)帳號
    pass: 'xxxx yyyy zzzz wwww'  // 你的gmail應用程式密碼
  }
});

// 收件者列表
const recipients = [
  'xxx@gmail.com',
  'xxx@gmail.com',
  // 加入更多收件者
];

let recipientIndex = 0;
let job=null;

// 發送郵件的函數
async function sendEmail() {
  const mailOptions = {
    from: 'xxx@gmail.com',
    to: recipients[recipientIndex],
    subject: '定期電子郵件',
    //text: '這是一封定期發送的電子郵件。',
    html: '<h1>Hello World</h1><p>This is an HTML email.</p>', // HTML 內容

    // 附加檔案
    attachments: [
      {
        filename: 'input.txt',
        path: './input.txt',
        contentType: 'text/plain'
      },
    ]
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email 已送到: ${recipients[recipientIndex]}`);
  } catch (error) {
    console.error('email 錯誤:', error);
  }

  // 更新收件者索引
  recipientIndex++
  if (recipientIndex >= recipients.length) 
    job.cancel();  //全部寄完, 關閉定時任務
}

// 設定每5分鐘發送一次郵件
job =scheduleJob('*/5 * * * *', sendEmail);

console.log('Email 開始定時任務...');
