<!DOCTYPE html>
<html lang="en">
@include('backend.layouts.header')

<body class="hold-transition sidebar-mini">
    <!-- Site wrapper -->
    <div class="wrapper">
        <!-- Navbar -->
        @include('backend.layouts.navbar')
        <!-- /Navbar -->

        <!-- Main Sidebar Container -->
        @include('backend.layouts.sidebar')
        <!-- /Main Sidebar Container -->

        <!-- Content Wrapper. Contains page content -->
        @yield('content')
        <!-- /Content-wrapper -->

        <!-- Main Footer -->
        @include('backend.layouts.main_footer')
        <!-- /Main Footer -->

        <!-- Control Sidebar -->
        <aside class="control-sidebar control-sidebar-dark">
            <!-- Control sidebar content goes here -->
        </aside>
        <!-- /Control-sidebar -->
    </div>
    <!-- /Wrapper -->

    @include('backend.layouts.footer')
</body>

</html>