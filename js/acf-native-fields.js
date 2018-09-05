(function($) {
	var ACF_Native_Fields = {
		editor_container: null,
		native_fields: null,

		/**
		 * Initialize the ACF Native Fields plugin
		 */
		init: function() {
			ACF_Native_Fields.editor_container = $('#wpbody-content');
			ACF_Native_Fields.native_fields = ACF_Native_Fields.editor_container.find('.acf-native-field');

			// Move all native fields into their placeholders
			ACF_Native_Fields.moveNativeFields();
		},

		/**
		 * Function that actually kickstarts the process of moving native WP fields into ACF fields
		 */
		moveNativeFields: function() {
			if(ACF_Native_Fields.native_fields.length < 1) {
				return;
			}

			ACF_Native_Fields.native_fields.each(ACF_Native_Fields.moveNativeField);
		},

		/**
		 * Get a native field element by selector. Wrapper around jQuery.find() to do any processing that needs to be
		 * done for all native elements before they're moved to an ACF field.
		 *
		 * @param selector Selector to pass to jQuery.find();
		 *
		 * @return jQuery A jQuery object of the found element
		 */
		getNativeFieldElement: function(selector) {
			return ACF_Native_Fields.handlePostbox(ACF_Native_Fields.editor_container.find(selector));
		},

		/**
		 * If the given element is a postbox (has .postbox class), do some necessary changes so that it fits the layout
		 *
		 * @param native_field jQuery object
		 *
		 * @return jQuery The same object that was passed, native_field
		 */
		handlePostbox: function(native_field) {
			if(native_field.hasClass('postbox')) {
				native_field.removeClass('postbox').addClass('native-field-postbox');
				native_field.find('.handlediv, h3').remove();
			}

			return native_field;
		},

		/**
		 * Callback run on each ACF Native Field placeholder on the page. Finds the correct native field and moves it
		 * into the given ACF Native Field placeholder.
		 */
		moveNativeField: function() {
			var native_field_placeholder = $(this).empty();
			var native_field_type = native_field_placeholder.data('native-field');

			// First try to find a built-in method to run for this type of native field
			if(typeof ACF_Native_Fields['moveNativeField_' + native_field_type] === 'function') {
				native_field_placeholder.append(ACF_Native_Fields['moveNativeField_' + native_field_type]());
				// TODO: Allow custom callback code to be added in field group settings and executed here?
			}
			// If none exists, see if a custom one has been passed, and exists
			else if(false) {
				// TODO: Implement backend and frontend functionality for custom native fields (hooks)
			}
			// If no built-in or custom method exists, give up and show a message about the problem instead.
			else {
				native_field_placeholder.html(acf._e('native_field', 'not_implemented'));
			}
		},

    /**
     * ACF Native Field type: WordPress Post Title
     */
    moveNativeField_post_title: function () {
      return ACF_Native_Fields.getNativeFieldElement('#titlediv');
    },

    /**
     * ACF Native Field type: WordPress content editor
     */
    moveNativeField_post_date: function () {
      return ACF_Native_Fields.getNativeFieldElement('.misc-pub-curtime');
    },

		/**
		 * ACF Native Field type: WordPress content editor
		 */
		moveNativeField_content: function() {
			return ACF_Native_Fields.getNativeFieldElement('#postdivrich');
		},

		/**
		 * ACF Native Field type: WordPress excerpt editor
		 */
		moveNativeField_excerpt: function() {
			return ACF_Native_Fields.getNativeFieldElement('#postexcerpt');
		},

		/**
		 * ACF Native Field type: WordPress featured image
		 */
		moveNativeField_featured_image: function() {
			return ACF_Native_Fields.getNativeFieldElement('#postimagediv');
		},

		/**
		 * ACF Native Field type: Yoast SEO meta box
		 */
		moveNativeField_yoast_seo: function() {
			return ACF_Native_Fields.getNativeFieldElement('#wpseo_meta');
		},

		/**
		 * ACF Native Field type: WordPress publish meta box
		 */
		moveNativeField_publish_box: function() {
			return ACF_Native_Fields.getNativeFieldElement('#submitdiv');
		},

		/**
		 * ACF Native Field type: WordPress permalink meta box
		 */
		moveNativeField_permalink: function() {
			return ACF_Native_Fields.getNativeFieldElement('#slugdiv');
		},

		/**
		 * ACF Native Field type: WordPress discussion settings meta box
		 */
		moveNativeField_discussion: function() {
			return ACF_Native_Fields.getNativeFieldElement('#commentstatusdiv');
		},

		/**
		 * ACF Native Field type: WordPress trackback settings meta box
		 */
		moveNativeField_trackbacks: function() {
			return ACF_Native_Fields.getNativeFieldElement('#trackbacksdiv');
		},

		/**
		 * ACF Native Field type: WordPress post format meta box
		 */
		moveNativeField_format: function() {
			return ACF_Native_Fields.getNativeFieldElement('#formatdiv');
		},

		/**
		 * ACF Native Field type: WordPress page attributes meta box
		 */
		moveNativeField_page_attributes: function() {
			return ACF_Native_Fields.getNativeFieldElement('#pageparentdiv');
		},

    /**
     * ACF Native Field type: Revisions
     */
    moveNativeField_revisions: function () {
      return ACF_Native_Fields.getNativeFieldElement('#revisionsdiv');
    },

    /**
     * ACF Native Field type: User username
     */
    moveNativeField_username: function () {
      return ACF_Native_Fields.getNativeFieldElement('#user_login');
    },

    /**
     * ACF Native Field type: User email
     */
    moveNativeField_email: function () {
      return ACF_Native_Fields.getNativeFieldElement('#email');
    },

    /**
     * ACF Native Field type: User account funds
     */
    moveNativeField_account_funds: function () {
      return ACF_Native_Fields.getNativeFieldElement('#account_funds');
    },

    /**
     * Product Fields
     */
    // WooCommerce Product Data
    moveNativeField_product_woocommerce_product_data: function () {
      return ACF_Native_Fields.getNativeFieldElement('#woocommerce-product-data');
    },
    // WooCommerce Memberships
    moveNativeField_product_woocommerce_memberships: function () {
      return ACF_Native_Fields.getNativeFieldElement('#wc-memberships-product-memberships-data');
    },
    // SEO Settings
    moveNativeField_product_seo_settings: function () {
      return ACF_Native_Fields.getNativeFieldElement('#tsf-inpost-box');
    },
    // Attendee Report
    moveNativeField_product_attendee_report: function () {
      return ACF_Native_Fields.getNativeFieldElement('#lrt_print_attendee_report');
    },
    // Name Tags
    moveNativeField_product_name_tags: function () {
      return ACF_Native_Fields.getNativeFieldElement('#lrt_print_labels');
    },
    // Fix Tickets
    moveNativeField_product_fix_tickets: function () {
      return ACF_Native_Fields.getNativeFieldElement('#fix_tickets_with_missing_product_attributes');
    },
    // Provision API
    moveNativeField_product_provision_api: function () {
      return ACF_Native_Fields.getNativeFieldElement('#lrt_meridian_provision_ticket');
    },

    /**
     * ACF Native Field type: Sensei Quiz Questions Metabox
     */
    moveNativeField_sensei_quiz_questions: function() {
        return ACF_Native_Fields.getNativeFieldElement('#lesson-quiz');
    },

    /**
     * ACF Native Field type: Sensei Quiz Settings Metabox
     */
    moveNativeField_sensei_quiz_settings: function() {
        return ACF_Native_Fields.getNativeFieldElement('#lesson-quiz-settings');
    },

    /**
     * ACF Native Field type: Sensei Quiz Questions Metabox
     */
    moveNativeField_sensei_lesson_info: function() {
        return ACF_Native_Fields.getNativeFieldElement('#lesson-info');
    },

    /**
     * ACF Native Field type: Sensei Lesson Course Metabox
     */
    moveNativeField_sensei_lesson_course: function() {
      return ACF_Native_Fields.getNativeFieldElement('#lesson-course');
    },

    /**
     * ACF Native Field type: Sensei Module Select Metabox
     */
    moveNativeField_sensei_module_select: function() {
      return ACF_Native_Fields.getNativeFieldElement('#module_select');
    },

    /**
     * ACF Native Field type: Sensei Lesson Prerequisite Metabox
     */
    moveNativeField_sensei_lesson_prerequisite: function() {
        return ACF_Native_Fields.getNativeFieldElement('#lesson-prerequisite');
    },

    /**
     * ACF Native Field type: Sensei Lesson Tags Metabox
     */
    moveNativeField_sensei_lesson_tags: function() {
        return ACF_Native_Fields.getNativeFieldElement('#tagsdiv-lesson-tag');
    },

    /**
     * ACF Native Field type: Sensei Lesson Preview Metabox
     */
    moveNativeField_sensei_lesson_preview: function() {
        return ACF_Native_Fields.getNativeFieldElement('#lesson-preview');
    },

    /**
     * ACF Native Field type: Sensei Teacher
     */
    moveNativeField_sensei_teacher: function() {
        return ACF_Native_Fields.getNativeFieldElement('#sensei-teacher');
    },

    /**
     * ACF Native Field type: Sensei Course Category
     */
    moveNativeField_sensei_course_categories: function() {
        return ACF_Native_Fields.getNativeFieldElement('#course-categorydiv');
    },

    /**
     * ACF Native Field type: Sensei Course Prerequisites
     */
    moveNativeField_sensei_course_prerequisites: function() {
        return ACF_Native_Fields.getNativeFieldElement('#course-prerequisite');
    },

    /**
     * ACF Native Field type: Sensei Featured Course
     */
    moveNativeField_sensei_course_featured: function() {
        return ACF_Native_Fields.getNativeFieldElement('#course-featured');
    },

    /**
     * ACF Native Field type: Sensei Course Notifications
     */
    moveNativeField_sensei_course_notifications: function() {
        return ACF_Native_Fields.getNativeFieldElement('#course-notifications');
    },

    /**
     * ACF Native Field type: Sensei Course Modules
     */
    moveNativeField_sensei_course_modules: function() {
        return ACF_Native_Fields.getNativeFieldElement('#module_course_mb');
    },

    /**
     * ACF Native Field type: Sensei Course Lessons
     */
    moveNativeField_sensei_course_lessons: function() {
        return ACF_Native_Fields.getNativeFieldElement('#course-lessons');
    },

    /**
     * ACF Native Field type: Sensei Course Video
     */
    moveNativeField_sensei_course_video: function() {
        return ACF_Native_Fields.getNativeFieldElement('#course-video');
    },

    /**
     * ACF Native Field type: Sensei WooCommerce Product
     */
    moveNativeField_sensei_course_wc_product: function() {
        return ACF_Native_Fields.getNativeFieldElement('#course-wc-product');
    },

    /**
     * ACF Native Field type: Sensei Course Management
     */
    moveNativeField_sensei_course_management: function() {
        return ACF_Native_Fields.getNativeFieldElement('#course-manage');
    },
	};

	$(document).ready(ACF_Native_Fields.init);
})(jQuery);
