@php
$usr = Auth::guard('web')->user();
@endphp

<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="{{asset('backend/index3.html')}}" class="brand-link">
        <img src="{{asset('backend/dist/img/hsbl.png')}}" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: 0.8" />
        <span class="brand-text font-weight-light">HSBLCO</span>
    </a>
    <!-- Sidebar -->
    <div class="sidebar">
        <!-- Sidebar user (optional) -->
        <!-- SidebarSearch Form -->
        <div class="form-inline">
            <div class="input-group" data-widget="sidebar-search">
                <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                <div class="input-group-append">
                    <button class="btn btn-sidebar">
                        <i class="fas fa-search fa-fw"></i>
                    </button>
                </div>
            </div>
        </div>
        <!-- Sidebar Menu -->
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->

                @if ($usr->can('dashboard.view'))
                <li class="nav-item {{ Route::is('general.index') || Route::is('general.create') || Route::is('general.edit')  ? 'menu-open' : null }} ">
                    <a href="#" class="nav-link {{ Route::is('general.index') || Route::is('general.create') || Route::is('general.edit')  ? 'active' : null }} ">
                        <!-- <i class="nav-icon fas fa-solid fa-user"></i> -->
                        <i class="nav-icon fa fa-info-circle" aria-hidden="true"></i>
                        <p>
                            General Info
                            <i class="fas fa-angle-left right"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="{{route('general.create')}}" class="nav-link {{ Route::is('general.create') ? 'active' : 'null' }} ">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Add</p>
                            </a>
                        </li>
                        {{--<li class="nav-item ">
                            <a href="{{route('general.index')}}" class="nav-link {{ Route::is('general.edit') ? 'active' : 'null' }} ">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Info List</p>
                        </a>
                </li>--}}
            </ul>
            </li>
            <li class="nav-item {{ Route::is('user.index') || Route::is('user.create') || Route::is('user.edit')  ? 'menu-open' : null }} ">
                <a href="#" class="nav-link {{ Route::is('user.index') || Route::is('user.create') || Route::is('user.edit')  ? 'active' : null }} ">
                    <!-- <i class="nav-icon fas fa-solid fa-user"></i> -->
                    <i class="nav-icon fas fa-users mr-2"></i>
                    <p>
                        Users
                        <i class="fas fa-angle-left right"></i>
                    </p>
                </a>
                <ul class="nav nav-treeview">
                    <li class="nav-item">
                        <a href="{{route('user.create')}}" class="nav-link {{ Route::is('user.create') ? 'active' : 'null' }} ">
                            <i class="far fa-circle nav-icon"></i>
                            <p>Add</p>
                        </a>
                    </li>
                    <li class="nav-item ">
                        <a href="{{route('user.index')}}" class="nav-link {{ Route::is('user.index') ? 'active' : 'null' }} ">
                            <i class="far fa-circle nav-icon"></i>
                            <p>User List</p>
                        </a>
                    </li>
                </ul>
            </li>
            @endif
            @if ($usr->can('role.create') || $usr->can('role.view') || $usr->can('role.edit') || $usr->can('role.delete'))
            <li class="nav-item {{ Route::is('role.index') || Route::is('role.create') || Route::is('role.edit')  ? 'menu-open' : null }} ">
                <a href="#" class="nav-link {{ Route::is('role.index') || Route::is('role.create') || Route::is('role.edit')  ? 'active' : null }}">
                    <i class="nav-icon fas fa-users mr-2"></i>
                    <p>
                        Roles & Permissions
                        <i class="fas fa-angle-left right"></i>
                    </p>
                </a>
                <ul class="nav nav-treeview">
                    @if ($usr->can('role.create'))
                    <li class="nav-item">
                        <a href="{{route('role.create')}}" class="nav-link {{ Route::is('role.create') ? 'active' : 'null' }}">
                            <i class="far fa-circle nav-icon"></i>
                            <p>Add</p>
                        </a>
                    </li>
                    @endif
                    @if ($usr->can('role.view'))
                    <li class="nav-item">
                        <a href="{{route('role.index')}}" class="nav-link {{ Route::is('role.index') || Route::is('role.edit') ? 'active' : null }} ">
                            <i class="far fa-circle nav-icon"></i>
                            <p>All Roles</p>
                        </a>
                    </li>
                    @endif
                </ul>
            </li>
            @endif

            </ul>
            </li>

            </ul>
        </nav>
        <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
</aside>