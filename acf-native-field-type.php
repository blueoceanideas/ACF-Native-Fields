<?php
if(!defined('ABSPATH')) exit;

class acf_field_native extends acf_field {
	function __construct() {
		$this->name = 'native_field';

		$this->label = __('Native Field', 'acf-native-fields');

		$this->defaults = array(
			'value'			=> false, // prevents acf_render_fields() from attempting to load value
		);

		$this->category = 'layout';

		$this->l10n = array(
			'not_implemented' => __('Native Field not implemented yet.', 'acf-native-fields'),
		);

    	parent::__construct();
	}

	function render_field_settings($field) {
		acf_render_field_setting($field, array(
			'label'			=> __('Native Field', 'acf-native-fields'),
			'instructions'	=> __('The native WordPress field to move into this placeholder.', 'acf-native-fields'),
			'type'			=> 'select',
			'name'			=> 'native_field',
			// TODO: Implement backend and frontend functionality for custom native fields (hooks)
			'choices'		=> array(
                'post_title'     => __('Post Title', 'acf-native-fields'),
                'post_date'      => __('Post Date', 'acf-native-fields'),
				'content'		 => __('Content Editor', 'acf-native-fields'),
				'excerpt'		 => __('Excerpt', 'acf-native-fields'),
				'featured_image' => __('Featured Image', 'acf-native-fields'),
				'yoast_seo'		 => __('Yoast SEO', 'acf-native-fields'),
				'publish_box'	 => __('Publish Box', 'acf-native-fields'),
				'permalink'	 	 => __('Permalink', 'acf-native-fields'),
				'discussion'	 => __('Discussion', 'acf-native-fields'),
				'trackbacks'	 => __('Trackbacks', 'acf-native-fields'),
				'format'		 => __('Format', 'acf-native-fields'),
				'page_attributes'=> __('Page Attributes', 'acf-native-fields'),
                'revisions'      => __('Revisions', 'acf-native-fields'),

                // User Fields
                'username'      => __('User: Username', 'acf-native-fields'),
                'email'         => __('User: Email', 'acf-native-fields'),
                'account_funds' => __('User: Account Funds', 'acf-native-fields'),

                'sensei_quiz_questions'      => __('Sensei Quiz Questions', 'acf-native-fields'),
                'sensei_quiz_settings'       => __('Sensei Quiz Settings', 'acf-native-fields'),
                'sensei_lesson_info'         => __('Sensei Lesson Info', 'acf-native-fields'),
                'sensei_lesson_course'       => __('Sensei Lesson Course', 'acf-native-fields'),
                'sensei_module_select'       => __('Sensei Module Select', 'acf-native-fields'),
                'sensei_lesson_prerequisite' => __('Sensei Lesson Prerequisite', 'acf-native-fields'),
                'sensei_lesson_preview'      => __('Sensei Lesson Preview', 'acf-native-fields'),
                'sensei_lesson_tags'         => __('Sensei Lesson Tags', 'acf-native-fields'),

                'sensei_teacher'              => __('Sensei Teacher', 'acf-native-fields'),
                'sensei_course_categories'    => __('Sensei Course Categories', 'acf-native-fields'),
                'sensei_course_prerequisites' => __('Sensei Course Prerequisites', 'acf-native-fields'),
                'sensei_course_featured'      => __('Sensei Featured Course', 'acf-native-fields'),
                'sensei_course_notifications' => __('Sensei Course Notifications', 'acf-native-fields'),
                'sensei_course_modules'       => __('Sensei Course Modules', 'acf-native-fields'),
                'sensei_course_lessons'       => __('Sensei Course Lessons', 'acf-native-fields'),
                'sensei_course_video'         => __('Sensei Course Video', 'acf-native-fields'),
                'sensei_course_wc_product'    => __('Sensei Course WooCommerce Product', 'acf-native-fields'),
                'sensei_course_management'    => __('Sensei Course Management', 'acf-native-fields'),
			),
		));
	}

	function render_field($field) {?>
		<div class="acf-native-field" data-native-field="<?php echo $field['native_field']; ?>">
			<?php _e('Loading...', 'acf-native-fields'); ?>
		</div><?php
	}

	function input_admin_enqueue_scripts() {
		wp_enqueue_script('acf-native-fields', plugins_url('/js/acf-native-fields.js', __FILE__), array('jquery'), ACF_Native_Fields::instance()->plugin_data['Version']);
		wp_enqueue_style('acf-native-fields', plugins_url('/css/acf-native-fields.css', __FILE__), array(), ACF_Native_Fields::instance()->plugin_data['Version']);
	}

	function field_group_admin_enqueue_scripts() {
		wp_enqueue_script('acf-native-fields-admin', plugins_url('/js/acf-native-fields-admin.js', __FILE__), array('jquery'), ACF_Native_Fields::instance()->plugin_data['Version']);
		wp_enqueue_style('acf-native-fields-admin', plugins_url('/css/acf-native-fields-admin.css', __FILE__), array(), ACF_Native_Fields::instance()->plugin_data['Version']);
	}
}
