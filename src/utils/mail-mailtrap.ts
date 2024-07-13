
export const sendMail = async (
    recipients_name: string, 
    recipients_email: string, 
    subject: string, 
    message: string) => {

    const API_URL = 'https://send.api.mailtrap.io/api/send';
    const API_TOKEN = import.meta.env.MAILTRAP_API_KEY ?? '';
    
	const body = `<!DOCTYPE html>
	<html lang="es">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Feedback from simplerb</title>
		<style>
			body {
				font-family: Arial, sans-serif;
				margin: 0;
				padding: 0;
				color: #333;
			}
			.container {
				padding: 20px;
				margin: 30px auto;
				width: 80%;
				background-color: #f9f9f9;
				border: 1px solid #ddd;
				box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
			}
			h2, h4 {
				color: #2c3e50;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<p>
				${message}
			</p>
		</div>
	</body>
	</html>
	`;
    
    const email_sender = {
        email: "mailtrap@simplerb.com",
        name: "AbsIn5",
    };
      
    const email_cc = {
        v1: {
          email: 'romanvieito@gmail.com',
          name: 'Alberto Roman Vieito'
        },
        v2: {
          email: 'alber@front10.com',
          name: 'Alberto Roman Vieito'
        }
    };
    
	const data = {
		"to": [
		  {
			"email": recipients_email,
			"name": recipients_name
		  }
		],
		// Con el cc
		// Demo domains can only be used to send emails to account owners. 
		// You can only send testing emails to your own email address.
		// Con el dominio verificado en mailtrap.io debe resolverse el problema
		"cc": [
		  {
			"email": email_cc.v1.email,
			"name": email_cc.v1.name
		  },
		  {
			"email": email_cc.v2.email,
			"name": email_cc.v2.name
		  }
		],
		"from": {
		  "email": email_sender.email,
		  "name": email_sender.name
		},
		"headers": {
		  "X-Message-Source": "simplerb.com"
		},
		"subject": subject,
		"html": body,
		"category": "Subcription"
	};
        
	const options = {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		  'Accept': 'application/json',
		  'Api-Token': API_TOKEN
		},
		body: JSON.stringify(data)
	};    
    
    try {
		const response = await fetch(API_URL, options);
		const data = await response.json();
		return { data: data };
	} catch (error) {
		return { error: error };
	}      
};
  