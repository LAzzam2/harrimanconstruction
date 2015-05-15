<?php
/*
Template Name: Internal
*/
$args = array (
	'post_type' => 'footer',
);

$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
$context['footer'] = @Timber::get_posts($query = $args, $class = 'TimberPost')[0];
Timber::render(array('page-internal.twig'), $context);