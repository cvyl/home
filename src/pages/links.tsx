import BackButton from '~/components/BackButton'
import styles from './links.module.sass'
import { defineComponent, ref, onMounted } from 'vue'
import Signature from '~/components/signature'

interface NavItem {
	title: string
	desc: string
	link: string
	icon?: string
}

interface NavCategory {
	title: string
	items: NavItem[]
}

export default defineComponent({
	name: 'LinksPage',
	setup() {
		useHead({
			title: 'Links',
			link: [{ rel: 'canonical', href: 'https://mikka.im/links' }],
			meta: [
				{ property: 'og:url', content: 'https://mikka.im/links' },
				{ name: 'description', content: 'A curated collection of useful links and resources' },
				{ property: 'og:title', content: 'Links' },
				{ property: 'og:description', content: 'A curated collection of useful links and resources' },
				{ property: 'twitter:title', content: 'Links' },
				{ property: 'twitter:description', content: 'A curated collection of useful links and resources' }
			]
		})

		const categories = ref<NavCategory[]>([])
		const loading = ref(true)

		onMounted(async () => {
			try {
				const response = await fetch('./nav.json')
				const data = await response.json()
				categories.value = data as NavCategory[]
			} catch (error) {
				console.error('Error fetching nav data:', error)
			} finally {
				loading.value = false
			}
		})

		return () => (
			<div class={styles.linksPage}>
				<BackButton to='/' class={styles.backButton} />
				<h1 class={styles.pageTitle}>Links</h1>
				<div class={styles.linksContainer}>
					{loading.value ? (
						<Signature />
					) : (
						categories.value.map((category) => (
							<div key={category.title} class={styles.navCategory}>
								<h2>{category.title}</h2>
								<div class={styles.navItems}>
									{category.items.map((item) => (
										<div key={item.title} class={styles.navItem}>
											<a href={item.link} target='_blank' class={styles.navLink}>
												{item.icon && <img src={item.icon} alt='icon' />}
												<div class={styles.navItemTitle}>{item.title}</div>
												<div class={styles.navItemDesc}>{item.desc}</div>
											</a>
										</div>
									))}
								</div>
							</div>
						))
					)}
				</div>
			</div>
		)
	}
})
