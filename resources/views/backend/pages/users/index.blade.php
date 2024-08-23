@extends('backend.layouts.app')
@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <!-- Content Header (Page header) -->
  <section class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1>Add User </h1>
        </div>
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item active">Project Add</li>
          </ol>
        </div>
      </div>
    </div><!-- /.container-fluid -->
  </section>

  <!-- Main content -->
  <section class="content">
    <div class="row">
      <div class="col-12">
        <div class="card card-primary card-outline">
          <div class="card-header">
            <h3 class="card-title">General</h3>
            <div class="card-tools">
              <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
                <i class="fas fa-minus"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            @include('backend.layouts.messages')
            @if(isset($edit))
            <form action="{{route('user.update', $edit->id)}}" method="post" class="row" enctype="multipart/form-data">
              @method('PUT')
              @csrf
              @else

              <form action="{{route('user.store')}}" method="post" class="row" enctype="multipart/form-data">
                @csrf
                @endif
                <div class="form-group col-6">
                  <label for="name">Name</label>
                  <input type="text" id="name" name="name" required value="{{ isset($edit) ? $edit->name : (old('name') ? old('name') : '') }}" class="form-control">
                  @error('name')
                  <span style="color: red">{{ $message }}</span>
                  @enderror
                </div>

                <div class="form-group col-6">
                  <label for="email">E-mail</label>
                  <input type="text" id="email" name="email" required value="{{ isset($edit) ? $edit->email : (old('email') ? old('email') : '') }}" class="form-control">
                  @error('email')
                  <span style="color: red">{{ $message }}</span>
                  @enderror
                </div>

                <div class="form-group col-6">
                  <label for="role">Role</label>
                  <select name="role" id="role" class="form-control" required>
                    <option value="">Select</option>
                    @foreach($roles as $Data)
                    <option value="{{$Data->name}}" {{ isset($edit) &&($edit->role==$Data->name) ? 'selected' :'null'}}>{{$Data->name}}</option>
                    @endforeach
                  </select>
                  @error('role')
                  <span style="color: red">{{ $message }}</span>
                  @enderror
                </div>

                <div class="form-group col-6">
                  <label for="password">Password</label>
                  <input type="text" id="password" name="password" {{ (!isset($edit) ) ? ('required') :('') ; }} value="{{ old('password') ? old('password')  : ''; }}" class="form-control">
                  @error('password')
                  <span style="color: red">{{ $message }}</span>
                  @enderror
                </div>



                <div class="col-12 form-group d-flex justify-content-end">
                  <input type="submit" value="Save" class="btn btn-success">
                </div>
              </form>

          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.card -->
      </div>
    </div>
  </section>
  <!-- /.content -->
</div>
<!-- /.content-wrapper -->
@endsection