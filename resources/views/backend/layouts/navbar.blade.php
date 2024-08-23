<nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
            <a href="" class="nav-link">Home</a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
            <a href="#" class="nav-link">Contact</a>
        </li>
    </ul>
    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
        <li class="nav-item" style="margin:auto;">
            <a class="nav-link d-flex" data-widget="fullscreen" href="#" role="button">
                <i class="fas fa-expand-arrows-alt"></i>
            </a>
        </li>
        <li class="nav-item" style="margin: auto;">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item dropdown">
                    <div class="nav-link user-panel mt-3 pb-3 mb-3 d-flex row" data-toggle="dropdown" href="#">
                        <div class="image">
                            <img style="margin:-30%;" src="{{asset('backend/dist/img/user2-160x160.jpg')}}" class="img-circle elevation-2 bg-primary" alt="User Image">
                        </div>
                        <div class="text-muted" style="margin: auto;">
                            <a href="#" class="text-muted">{{auth()->user()->name}}</a>
                            <i class="text-black fas fa-angle-down right"></i>
                        </div>
                    </div>
                    <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right bg-primary ">
                        <a href="{{ route('user.edit', auth()->user()->id)}}" class="dropdown-item btn text-primary text-center"><i class="fas fa-solid fa-user "></i> Profile </a>
                        <div class="dropdown-divider"></div>
                        <a href="{{ route('logout') }}" class="dropdown-item btn text-primary text-center" onclick="event.preventDefault();
                              document.getElementById('logout-form').submit();">
                            <i class="nav-icon fas fa-sign-out-alt"></i> Logout

                        </a>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                            @csrf
                        </form>
                    </div>
                </li>
            </ul>
        </li>
    </ul>
</nav>