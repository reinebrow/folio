let baseurl = document.currentScript.getAttribute('data-baseurl');
let basetitle = document.currentScript.getAttribute('data-title');
let baseacc = document.currentScript.getAttribute('data-acc');

document.write(`
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>`+basetitle+`</title>
	<meta name="description" content="">
	<meta name="keywords" content="">
	<meta name="robots" content="" />
	<meta property="og:image" content="`+baseurl+`assets/images/preview.jpg">
	<link rel="shortcut icon" href="`+baseurl+`assets/images/favicon.svg">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
	<link href="`+baseurl+`assets/css/main.css" rel="stylesheet" />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Gloock&family=Montserrat:wght@400;500;600;700;800&family=Charmonman&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script src="`+baseurl+`assets/js/jquery.scrollTo-min.js"></script>
</head>
`);
