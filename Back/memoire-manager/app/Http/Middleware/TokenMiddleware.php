<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;


class TokenMiddleware
{
    /**
     * Middleware lookalike.
     */
    public function handle(Request $request)
    {
        $token = $request->user()?->currentAccessToken();

        if ($token && $token->expires_at && $token->expires_at->isPast()) {
            return response()->json(['message' => 'Token expired'], 401);
        }
    }
}
