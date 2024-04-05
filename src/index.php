<!doctype html>
<html data-theme="light">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../dist/output.css" rel="stylesheet">
    <title>WisLam</title>
    <script defer type="module" src="../js/home.js"></script>
</head>

<body >
    <div class="container mx-auto ">
        <div class="drawer">
            <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content flex flex-col">
                <?php
                // Navbar
                require_once('./navBarDesktop.php');
                // Page content here
                
                //Navbar mobile
                require_once('./navBarMobile.php')
                ?>
        </div>
    </div>
    
</body>

</html>