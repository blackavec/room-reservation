<?php

Route::get('/', 'HomeController@home')->name('home');

Route::get('/timeline', 'TimelineController@dateList')->name('datalist');
