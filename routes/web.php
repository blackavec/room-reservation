<?php

Route::get('/', 'HomeController@home')->name('home');

Route::get('/timetable', 'TimetableController@dateList')->name('datalist');
Route::patch('/timetable', 'TimetableController@update')->name('update');
