<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('clients', function (Blueprint $table) {
            $table->renameColumn('name', 'client_name');
            $table->renameColumn('email', 'client_email');
            $table->renameColumn('phone', 'client_phone');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('clients', function (Blueprint $table) {
            $table->renameColumn('client_name', 'name');
            $table->renameColumn('client_email', 'email');
            $table->renameColumn('client_phone', 'phone');
        });
    }
};
