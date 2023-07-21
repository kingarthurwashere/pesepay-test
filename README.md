# Pesepay-Test-App

Testing with Postman:

Open Postman and create a new request with the following URL: [<http://localhost:3000/initiate-transaction>]. Make sure to replace the port number if you used a different one in the code.

- Send the request and you should receive a response with the redirectUrl.

- Copy the redirectUrl from the response and open it in your web browser. This will simulate the user completing   the payment.

- After the payment is completed (or you wait for a few seconds to simulate the user completing the payment), create another request in Postman with the following URL: [<http://localhost:3000/poll-transaction/YOUR_POLL_URL>.] Replace YOUR_POLL_URL with the actual pollUrl received in the previous response.

- Send the request, and you should receive a response indicating whether the payment was successful.

By setting up this server and using Postman to make requests, you can simulate the pesepay interactions and test your API. In a real-world scenario, the redirectUrl would be provided to the user so they can complete the payment on the pesepay platform, and the server would handle the polling to check the payment status.
