<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST["name"];
    $email = $_POST["email"];
    $address = $_POST["address"];
    $orderData = json_decode($_POST["orderData"], true);

    $to = "your@email.com";
    $subject = "New Order";

    $message = "Customer: $name\nEmail: $email\nAddress: $address\n\nOrder:\n";

    $total = 0;

    foreach ($orderData as $item) {
        $line = $item["name"] . " x" . $item["quantity"];
        $line .= " = $" . ($item["price"] * $item["quantity"]) . "\n";
        $message .= $line;
        $total += $item["price"] * $item["quantity"];
    }

    $message .= "\nTotal: $" . $total;

    $headers = "From: noreply@site.com";

    mail($to, $subject, $message, $headers);

    echo "<h1>Order Sent!</h1>";
}
?>