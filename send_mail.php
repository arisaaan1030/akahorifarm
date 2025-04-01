<?php
// フォームからのデータを取得
$name = $_POST['name'] ?? '';
$company = $_POST['company'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$subject = $_POST['subject'] ?? '';
$message = $_POST['message'] ?? '';

// 送信先メールアドレス
$to = 'akahori.m@gmail.com';

// メールの件名
$email_subject = '[お問い合わせ] ' . $subject;

// メール本文
$email_body = "以下の内容でお問い合わせがありました。\n\n";
$email_body .= "お名前: " . $name . "\n";
if (!empty($company)) {
    $email_body .= "会社名: " . $company . "\n";
}
$email_body .= "メールアドレス: " . $email . "\n";
if (!empty($phone)) {
    $email_body .= "電話番号: " . $phone . "\n";
}
$email_body .= "お問い合わせ内容:\n" . $message . "\n";

// 追加ヘッダー
$headers = "From: " . $email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";

// メール送信
$mail_sent = mail($to, $email_subject, $email_body, $headers);

// リダイレクト先
if ($mail_sent) {
    // 成功した場合
    header('Location: thank_you.html');
} else {
    // 失敗した場合
    header('Location: contact_error.html');
}
exit;
?>