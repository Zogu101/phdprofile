/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./blog/**/*.html",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-light': 'var(--color-primary-light)',
        accent: 'var(--color-accent)',
        dark: 'var(--color-dark)',
        text: 'var(--color-text)',
        muted: 'var(--color-text-muted)',
        gray: 'var(--color-gray)',
        border: 'var(--color-border)',
        'footer-bg': 'var(--color-footer-bg)',
        white: 'var(--color-white)',
        'light-bg': 'var(--color-light-bg)',
      },
      fontFamily: {
        work: ['var(--font-primary)'],
        poppins: ['var(--font-secondary)'],
        lao: ['var(--font-tertiary)'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
    },
  },
  plugins: [],
};
