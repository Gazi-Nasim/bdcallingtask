<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laravel + React</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="{{asset('backend/plugins/fontawesome-free/css/all.min.css')}}">
  <!-- icheck bootstrap -->
  <link rel="stylesheet" href="{{asset('backend/plugins/icheck-bootstrap/icheck-bootstrap.min.css')}}">
  <!-- Theme style -->
  <link rel="stylesheet" href="{{asset('backend/dist/css/adminlte.min.css')}}">

  <link rel="stylesheet" href="{{asset('backend/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css')}}" />
  <link rel="stylesheet" href="{{asset('backend/plugins/datatables-responsive/css/responsive.bootstrap4.min.css')}}" />
  <link rel="stylesheet" href="{{asset('backend/plugins/datatables-buttons/css/buttons.bootstrap4.min.css')}}" />
  
    
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    <style>
        /* Custom styles for the design */
        body {
            font-family: Arial, sans-serif;
        }

        .navbar-brand img {
            height: 50px;
            width: auto;
        }

        .main-section {
            height: 100vh;
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 50px;
        }

        .main-section h1 {
            font-size: 10vw;
            line-height: 1;
        }

        .main-section p {
            max-width: 500px;
            font-size: 1.2rem;
            margin-top: 20px;
        }

        .video-intro {
            text-align: center;
            margin-top: 20px;
        }

        .video-intro img {
            border-radius: 50%;
            width: 100px;
            height: 100px;
        }


        .footer-container {
            background-color: #000;
            color: #fff;
            padding: 50px 0;
        }

        .footer-logo {
            font-size: 1.5rem;
            margin-bottom: 20px;
        }

        .social-links a {
            display: block;
            color: #fff;
            text-decoration: none;
            margin-bottom: 10px;
            font-size: 1.2rem;
        }

        .social-links a:hover {
            text-decoration: underline;
        }

        .footer-copyright {
            padding: 20px 0;
            border-top: 1px solid #333;
            color: #ccc;
            font-size: 0.9rem;
        }

        .lets-talk {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            font-size: 4rem;
            font-weight: bold;
            background: linear-gradient(90deg, #f0c, #ff5252, #ff9800);
            -webkit-background-clip: text;
            color: transparent;
        }
    </style>
</head>

<body>
    <div id="app"></div>
</body>

<!-- jQuery -->
<script src="{{asset('backend/plugins/jquery/jquery.min.js')}}"></script>
<!-- Bootstrap 4 -->
<script src="{{asset('backend/plugins/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
<!-- AdminLTE App -->
<script src="{{asset('backend/dist/js/adminlte.min.js')}}"></script>
<!-- data Table -->
<script src="{{asset('backend/plugins/datatables/jquery.dataTables.min.js')}}"></script>
<script src="{{asset('backend/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js')}}"></script>
<script src="{{asset('backend/plugins/datatables-responsive/js/dataTables.responsive.min.js')}}"></script>
<script src="{{asset('backend/plugins/datatables-responsive/js/responsive.bootstrap4.min.js')}}"></script>
<script src="{{asset('backend/plugins/datatables-buttons/js/dataTables.buttons.min.js')}}"></script>
<script src="{{asset('backend/plugins/datatables-buttons/js/buttons.bootstrap4.min.js')}}"></script>
<script src="{{asset('backend/plugins/jszip/jszip.min.js')}}"></script>
<script src="{{asset('backend/plugins/pdfmake/pdfmake.min.js')}}"></script>
<script src="{{asset('backend/plugins/pdfmake/vfs_fonts.js')}}"></script>
<script src="{{asset('backend/plugins/datatables-buttons/js/buttons.html5.min.js')}}"></script>
<script src="{{asset('backend/plugins/datatables-buttons/js/buttons.print.min.js')}}"></script>
<script src="{{asset('backend/plugins/datatables-buttons/js/buttons.colVis.min.js')}}"></script>

@stack('footer_script')
<script>
  $(function() {
    $("#example1")
      .DataTable({
        responsive: true,
        lengthChange: false,
        autoWidth: false,
        buttons: '',
      })
      .buttons()
      .container()
      .appendTo("#example1_wrapper .col-md-6:eq(0)");
    $("#example2").DataTable({
      paging: true,
      lengthChange: false,
      searching: false,
      ordering: true,
      info: true,
      autoWidth: false,
      responsive: true,
    });
  });
  
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</html>
