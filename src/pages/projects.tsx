import { ref, onMounted } from 'vue'
import BackButton from '~/components/BackButton'
import styles from './projects.module.sass'
import Signature from '~/components/signature'

interface Project {
	id: string
	title: string
	date: string
	tags: string[]
	category: string
	description?: string
	cover?: string
	link?: string
}

export default defineComponent({
	name: 'ProjectsPage',
	setup() {
		const projects = ref<Project[]>([])
		const loading = ref(true)

		useHead({
			title: '项目列表',
			link: [{ rel: 'canonical', href: 'https://mikka.im/projects' }],
			meta: [
				{ property: 'og:url', content: 'https://mikka.im/projects' },
				{ name: 'description', content: 'Mikka的项目列表' },
				{ property: 'og:title', content: '项目列表' },
				{ property: 'og:description', content: 'Mikka的项目列表' },
				{ property: 'twitter:title', content: '项目列表' },
				{ property: 'twitter:description', content: 'Mikka的项目列表' }
			]
		})

		onMounted(async () => {
			try {
				const response = await fetch('./projects.json')
				const data = await response.json()
				projects.value = data as Project[]
			} catch (error) {
				console.error('Error fetching projects data:', error)
			} finally {
				loading.value = false
			}
		})

		return () => (
			<div class={styles.projectsPage}>
				<BackButton to='/' class={styles.backButton} />
				<h1 class={styles.pageTitle}>My Projects</h1>
				{loading.value ? (
					<Signature />
				) : (
					<div class={styles.gridContainer}>
						{projects.value.map((project) => (
							<div key={project.id} class={styles.projectCard}>
								{project.cover && <img src={project.cover} alt={project.title} class={styles.projectImage} />}
								<div class={styles.projectContent}>
									<h2 class={styles.projectTitle}>
										{project.link ? (
											<a href={project.link} target='_blank' rel='noopener noreferrer'>
												{project.title}
											</a>
										) : (
											project.title
										)}
									</h2>
									<p class={styles.projectCategory}>{project.category}</p>
									<p class={styles.projectDescription}>{project.description}</p>
									<div class={styles.projectTags}>
										{project.tags.map((tag) => (
											<span key={tag} class={styles.tag}>
												#{tag}
											</span>
										))}
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		)
	}
})
