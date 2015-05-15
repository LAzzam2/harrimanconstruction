<?php
	/**
	 * Proper way to enqueue scripts and styles
	 */
	if( function_exists('acf_add_options_page') ) {
	
		acf_add_options_page(array(
			'page_title' 	=> 'Theme General Settings',
			'menu_title'	=> 'Theme Settings',
			'menu_slug' 	=> 'theme-general-settings',
			'capability'	=> 'edit_posts',
			'redirect'		=> false
		));
		acf_add_options_sub_page(array(
			'page_title' 	=> 'Theme Footer Settings',
			'menu_title'	=> 'Footer',
			'parent_slug'	=> 'theme-general-settings',
		));
		
	}

	function hc_scripts() {
		wp_enqueue_style( 'slick css', '//cdn.jsdelivr.net/jquery.slick/1.3.7/slick.css' );
		wp_enqueue_style( 'fancybox css', get_template_directory_uri() . '/css/jquery.fancybox.css' );
		wp_enqueue_style( 'main styles', get_stylesheet_uri());
		wp_enqueue_script( 'foundation', get_template_directory_uri() . '/bower_components/foundation/js/foundation.min.js', array('jquery'), '0.1', true );
		wp_enqueue_script( 'modernizer', get_template_directory_uri() . '/bower_components/modernizr/modernizr.js', array(), '0.1', true );
		wp_enqueue_script( 'slick js', '//cdn.jsdelivr.net/jquery.slick/1.3.7/slick.min.js', array('jquery'), '0.1', true );
		wp_enqueue_script( 'tappy', get_template_directory_uri() . '/js/tappy.js', array('jquery'), '0.1', true);
		wp_enqueue_script( 'fancybox', get_template_directory_uri() . '/js/source/jquery.fancybox.js', array('jquery'), '0.1', true);
		wp_enqueue_script( 'application', get_template_directory_uri() . '/js/app.js', array('jquery'), '0.1', true);
	}

	add_action( 'wp_enqueue_scripts', 'hc_scripts' );

	if (!class_exists('Timber')){
		add_action( 'admin_notices', function(){
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . admin_url('plugins.php#timber') . '">' . admin_url('plugins.php') . '</a></p></div>';
		});
		return;
	}

	class StarterSite extends TimberSite {

		function __construct(){
			add_theme_support('post-formats');
			add_theme_support('post-thumbnails');
			add_theme_support('menus');
			add_filter('timber_context', array($this, 'add_to_context'));
			add_filter('get_twig', array($this, 'add_to_twig'));
			add_action('init', array($this, 'register_post_types'));
			add_action('init', array($this, 'register_taxonomies'));
			parent::__construct();
		}

		function register_post_types(){
		}

		function register_taxonomies(){
			//this is where you can register custom taxonomies
		}

		function add_to_context($context){
			$context['foo'] = 'bar';
			$context['stuff'] = 'I am a value set in your functions.php file';
			$context['notes'] = 'These values are available everytime you call Timber::get_context();';
			$context['menu'] = new TimberMenu('main_nav');
			$context['site'] = $this;
    		$context['uri']  = get_stylesheet_directory_uri();
			return $context;
		}

		function add_to_twig($twig){
			/* this is where you can add your own fuctions to twig */
			$twig->addExtension(new Twig_Extension_StringLoader());
			$twig->addFilter('myfoo', new Twig_Filter_Function('myfoo'));
			return $twig;
		}

	}

	if (class_exists('Timber')){
	    TimberHelper::function_wrapper( 'okb_get_option' );
	    TimberHelper::function_wrapper( 'krumo' );
	    TimberHelper::function_wrapper( 'display_blocks' );
	    TimberHelper::function_wrapper( 'do_shortcode' );
	    TimberHelper::function_wrapper( 'okb_get_setting' );
	    TimberHelper::function_wrapper( 'timber_get_posts' );
	}

	add_filter('timber_context', 'add_to_context');
	function add_to_context($data){
	    /* So here you are adding data to Timber's context object, i.e... */
	    $data['foo'] = 'I am some other typical value set in your functions.php file, unrelated to the menu';

	        /* Now, in similar fashion, you add a Timber menu and send it along to the context. */
	    $data['menu'] = new TimberMenu(); // This is where you can also send a Wordpress menu slug or ID
	    return $data;
	}

	new StarterSite();

	function myfoo($text){
    	$text .= ' bar!';
    	return $text;
	}

	Timber::$locations = '/app/themes/harrimanconstruction2015/';

	function cc_mime_types($mimes) {
	  $mimes['svg'] = 'image/svg+xml';
	  return $mimes;
	}
	add_filter('upload_mimes', 'cc_mime_types');