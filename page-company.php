<?php
/*
Template Name: contact us
*/
$args = array (
	'post_type' => 'footer',
);

$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
$context['options'] = get_fields('options');
Timber::render(array('page-company.twig'), $context);