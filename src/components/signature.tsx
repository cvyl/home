import { Signature } from '../components/icons/signature'
import styles from './signature.module.sass'

export default defineComponent({
	setup() {
		return () => (
			<div class={styles.signatureContainer}>
				<Signature class={`${styles.signatureAnimated} ${styles.size}`} />
			</div>
		)
	}
})
