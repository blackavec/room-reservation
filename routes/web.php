<?php

Route::get('/', 'HomeController@home')->name('home');

Route::get('/timetable', 'TimetableController@dateList')->name('data-list');
Route::patch('/timetable', 'TimetableController@update')->name('update');
Route::put('/timetable', 'TimetableController@bulkUpdate')->name('bulk-update');
