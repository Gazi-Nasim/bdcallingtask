<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\DB;
use Closure;

class AuthController extends Controller
{


    public function __construct(Request $request)
    {
        if (Auth::guard('api')->guest()) {
            return response()->json(['message' => 'Token expired. Please log in again.'], 401);
        }
        
    }

    function index(Request $request)
    {
        // dd("permissions");
        $permission_groups = User::getPermissionGroups();
        $groupAndPermission = [];
        foreach ($permission_groups as $item) {
            $permissions = DB::table('permissions')
                ->select('id', 'name', 'group_name')
                ->where('group_name', $item->name)
                ->get();
            $groupAndPermission[] = [
                'name' => $item->name,
                'permissions' => $permissions
            ];
        }
        return response()->json([$groupAndPermission]);
    }


    public function login(Request $request)
    {
        $credentials = $request->only(['email', 'password']);
        // dd($credentials);
        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $this->respondWithToken($token);
    }



    public function me()
    {
        return response()->json(auth('api')->user());
    }

    public function logout()
    {
        auth('api')->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth('api')->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'token' => $token,
            'status' => true,
            'user' => auth('api')->user(),
        ]);
    }

    public function getRoleAndPermission(string $id = null)
    {

        if ($id == null) {
            $roles = Role::all();
        } else {
            $roles = Role::where('name', $id)->get();
        }

        // dd($roles);
        $roleAndPermission = [];
        foreach ($roles as $role) {
            $permissions = DB::table('role_has_permissions')
                ->join('permissions', 'role_has_permissions.permission_id', '=', 'permissions.id')
                ->select('permissions.id', 'permissions.name')
                ->where('role_id', $role->id)
                ->get();
            $roleAndPermission[] = [
                'id' => $role->id,
                'role' => $role->name,
                'permissions' => $permissions
            ];
        }

        return response()->json($roleAndPermission);
    }

    public function getRoleAndPermissionByid(string $id = null)
    {

        if ($id == null) {
            $roles = Role::all();
        } else {
            $roles = Role::where('id', $id)->get();
        }

        // dd($roles);
        $roleAndPermission = [];
        foreach ($roles as $role) {
            $permissions = DB::table('role_has_permissions')
                ->join('permissions', 'role_has_permissions.permission_id', '=', 'permissions.id')
                ->select('permissions.id', 'permissions.name')
                ->where('role_id', $role->id)
                ->get();
            $roleAndPermission[] = [
                'id' => $role->id,
                'role' => $role->name,
                'permissions' => $permissions
            ];
        }

        return response()->json($roleAndPermission);
    }
}
