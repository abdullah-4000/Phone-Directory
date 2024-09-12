<?php?>
/**
 * Template Name: Custom Form Template
 */
<?get_header();?>

<div id="primary" class="content-area">
    <main id="main" class="site-main" role="main">
        <form method="post" action="<?php echo esc_url( admin_url('admin-post.php') ); ?>">
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Picture</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Profession</th>
                        <th>Date of Birth</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Add input fields here -->
                </tbody>
            </table>
            <input type="submit" name="submit_form" value="Submit">
            <input type="hidden" name="action" value="process_custom_form">
            <?php wp_nonce_field( 'process_custom_form', 'custom_form_nonce' ); ?>
        </form>
    </main>
</div>

function process_custom_form() {
    if ( isset( $_POST['custom_form_nonce'] ) && wp_verify_nonce( $_POST['custom_form_nonce'], 'process_custom_form' ) ) {
        // Sanitize and save form data to database
        // You can use WordPress functions like `sanitize_text_field`, `wp_insert_post`, etc.
    }
}
add_action( 'admin_post_process_custom_form', 'process_custom_form' );
add_action( 'admin_post_nopriv_process_custom_form', 'process_custom_form' ); 
