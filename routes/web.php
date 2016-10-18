<?php

Route::get('/', 'HomeController@home')->name('home');

Route::get('/timetable', 'TimetableController@dateList')->name('datalist');
