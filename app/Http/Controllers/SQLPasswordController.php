<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SQLPasswordController extends Controller
{
    public function index()
    {
        return Inertia::render('changePassword/SQLLogin');
    }

    public function indexChange()
    {
        if (!Session::has('sql_username')) {
            return redirect()->route('sqlpassword.login')->withErrors(['session' => 'Debe autenticarse primero.']);
        }

        return Inertia::render('changePassword/SQLChangePassword', [
            'username' => Session::get('sql_username'),
        ]);
    }

    public function authenticate(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'current_password' => 'required|string',
        ]);

        $connection = @sqlsrv_connect(env('DB_HOST'), [
            'UID' => $request->username,
            'PWD' => $request->current_password,
            'Database' => 'master',
        ]);

        if (!$connection) {
            return back()->withErrors(['current_password' => 'Usuario o contraseña incorrectos.']);
        }
        Session::put('sql_username', $request->username);
        sqlsrv_close($connection);

        
        $controladorUsuario = new UsuarioController();
        $response = $controladorUsuario->buscarUsuario(new Request(['nameuser' => $request->username]));

        $userData = json_decode($response->getContent(), true);
        // Verificar si userNew es null
        if (is_null($userData['userNew'])) {
            // Guardar datos de userLogin y current_password en la sesión
            session([
                'userLogin' => $userData['userLogin'],
                'current_password' => $request->current_password, // Guardar la contraseña en la sesión
            ]);
            return redirect()->route('completarDatos');
        }
        

        return redirect()->route('changePassword/sqlpassword.change');
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'new_password' => [
                'required',
                'string',
                'min:8',
                'regex:/[A-Z]/',
                'regex:/[a-z]/',
                'regex:/[0-9]/',
                'regex:/[@$!%*?&#.]/',
            ],
            'new_password_confirmation' => 'required|same:new_password',
        ]);

        $username = Session::get('sql_username');

        if (!$username) {
            return redirect()->route('changePassword/sqlpassword.login')->withErrors(['session' => 'Debe autenticarse primero.']);
        }

        try {
            $newPassword = $request->new_password;
            DB::unprepared("ALTER LOGIN [$username] WITH PASSWORD = '$newPassword'");

            return redirect()->route('changePassword/sqlpassword.loading');
        } catch (\Exception $e) {
            return back()->withErrors(['new_password' => 'Error al actualizar la contraseña: ' . $e->getMessage()]);
        }
    }

    public function closeSessions(Request $request)
    {
        $username = Session::get('sql_username');

        if (!$username) {
            return back()->withErrors(['message' => 'No autorizado.']);
        }

        try {
            $sessions = DB::select("SELECT session_id FROM sys.dm_exec_sessions WHERE login_name = ?", [$username]);

            foreach ($sessions as $session) {
                DB::unprepared("KILL {$session->session_id}");
            }

            Session::forget('sql_username');

            return redirect()->route('changePassword/sqlpassword.success');
        } catch (\Exception $e) {
            return back()->withErrors(['message' => 'Error al cerrar las sesiones: ' . $e->getMessage()]);
        }
    }
}
