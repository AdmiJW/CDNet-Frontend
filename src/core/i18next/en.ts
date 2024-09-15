export type Dict = typeof en;

const fmtErr = (msg: string) =>
    `${msg} Please try again or check the console for more information.`;

export const en = {
    common: {
        language: 'Language',
        colorScheme: 'Color scheme',
        light: 'Light',
        dark: 'Dark',
        system: 'System',
        dashboard: 'Dashboard',
        users: 'Users',
        admins: 'Admins',
        login: 'Login',
        logout: 'Logout',
        username: 'Username',
        password: 'Password',
        confirmPassword: 'Confirm password',
        submit: 'Submit',
        save: 'Save',
        confirm: 'Confirm',
        cancel: 'Cancel',
        email: 'Email',
        phone: 'Phone',
        skills: 'Skills',
        hobbies: 'Hobbies',
        id: 'ID',
        create: 'Create',
        update: 'Update',
        delete: 'Delete',
    },
    auth: {
        welcome: 'Welcome to CDNet 👋🏻',
        errorAuthentication: fmtErr('An error had occurred during authentication.'),
        loggingOut: 'Logging out...',
        loggedOut: 'You are not logged in. Please log in to continue.',
        successLogin: 'Login successful as {{username}}',
        invalidCredentials: 'Invalid credentials',
    },
    users: {
        errorGetUsers: fmtErr('Failed to retrieve users.'),
        errorGetUser: fmtErr('Failed to retrieve user.'),
        createUser: 'Create User',
        createUserSuccess: 'User {{username}} has been created.',
        createUserError: fmtErr('An error had occurred during user creation.'),
        updateUser: 'Update User {{username}}',
        updateUserSuccess: 'User {{username}} has been updated.',
        updateUserError: fmtErr('An error had occurred during user update.'),
        deleteTitle: 'Delete user {{username}}?',
        deleteMessage:
            'Are you sure you want to delete user {{username}}? This action is irreversible.',
        deleteSuccess: 'User {{username}} has been deleted.',
        deleteError: fmtErr('An error had occurred during user deletion.'),
    },
    footer: {
        c1: 'Made with',
        c2: 'by',
    },
};
