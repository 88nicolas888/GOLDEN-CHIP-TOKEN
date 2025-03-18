
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				game: {
					'blue': '#7AA2F7',
					'pink': '#F7768E',
					'purple': '#BB9AF7',
					'orange': '#FF9E64',
					'yellow': '#E0AF68',
					'green': '#9ECE6A',
					'background': '#F2FCE2',
					'card': '#FEF7CD'
				},
				poker: {
					'felt': '#1B4D3E',
					'red': '#D12C2C',
					'blue': '#2C5CD1',
					'gold': '#E0AF68',
					'black': '#000000',
					'gray': '#555555',
					'purple': '#7E3BA1',
					'card': '#FFFFFF'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fall': {
					'0%': { transform: 'translateY(-100px)', opacity: '0' },
					'10%': { opacity: '1' },
					'100%': { transform: 'translateY(calc(100vh + 100px))', opacity: '1' }
				},
				'collect': {
					'0%': { transform: 'scale(1)', opacity: '1' },
					'50%': { transform: 'scale(1.5)', opacity: '0.5' },
					'100%': { transform: 'scale(0)', opacity: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-scale': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' }
				},
				'spin-2d': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'page-transition': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fall': 'fall var(--fall-duration, 5s) linear forwards',
				'collect': 'collect 0.3s ease-out forwards',
				'float': 'float 3s ease-in-out infinite',
				'pulse-scale': 'pulse-scale 2s ease-in-out infinite',
				'spin-2d': 'spin-2d 6s linear infinite',
				'fade-in': 'fade-in 0.5s ease-out',
				'page-transition': 'page-transition 0.5s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
