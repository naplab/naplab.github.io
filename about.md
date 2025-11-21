---
layout: page
title: NapLab | Mesgarani
subtitle: 
---

Welcome to the Neural Acoustic Processing Laboratory at Columbia University. Our research is dedicated to understanding and engineering the future of human auditory communication, and it is built on three core pillars:

<style>
	.research-cards {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 32px;
		margin: 32px 0 40px;
	}

	.research-card {
		background: #ffffff;
		color: #1e2d44;
		border-radius: 20px;
		padding: 32px 26px;
		border: 1px solid rgba(23, 76, 140, 0.12);
		box-shadow: 0 18px 32px rgba(17, 52, 94, 0.1);
		text-align: center;
		position: relative;
		overflow: hidden;
		cursor: pointer;
		transition: transform 180ms ease, box-shadow 220ms ease;
		outline: none;
	}

	.research-card:hover,
	.research-card:focus-visible {
		transform: translateY(-6px);
		box-shadow: 0 24px 42px rgba(17, 52, 94, 0.16);
	}

	.research-card::after {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		width: 120%;
		height: 120%;
		background: radial-gradient(circle at center, rgba(23, 76, 140, 0.12), transparent 65%);
		transform: translate(-50%, -50%) scale(0);
		transition: transform 320ms ease;
		pointer-events: none;
	}

	.research-card.is-active::after {
		transform: translate(-50%, -50%) scale(1);
	}

	.research-card .icon {
		margin-bottom: 18px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 74px;
		height: 74px;
		border-radius: 50%;
		background: linear-gradient(135deg, rgba(23, 76, 140, 0.12), rgba(23, 76, 140, 0.02));
		box-shadow: inset 0 0 0 1px rgba(23, 76, 140, 0.14);
	}

	.research-card svg {
		width: 36px;
		height: 36px;
		fill: none;
		stroke: #174c8c;
		stroke-width: 2.4;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.research-card h3 {
		font-size: 1.12rem;
		font-weight: 700;
		margin-bottom: 12px;
	}

	.research-card p {
		font-size: 0.98rem;
		line-height: 1.55;
		margin: 0;
		color: #3d5068;
	}

	@media (max-width: 960px) {
		.research-cards {
			display: flex;
			gap: 24px;
			overflow-x: auto;
			padding-bottom: 12px;
		}

		.research-card {
			flex: 0 0 280px;
		}
	}
</style>

<section class="research-cards">
	<article class="research-card" tabindex="0">
		<div class="icon" aria-hidden="true">
			<svg viewBox="0 0 48 48" role="presentation">
				<path d="M20 14c0-3.3-2.7-6-6-6-4 0-6 3-6 7 0 2.3.8 4.4 2.3 6-1.5 1.6-2.3 3.7-2.3 6 0 4 2 7 6 7 3.3 0 6-2.7 6-6"></path>
				<path d="M28 14c0-3.3 2.7-6 6-6 4 0 6 3 6 7 0 2.3-.8 4.4-2.3 6 1.5 1.6 2.3 3.7 2.3 6 0 4-2 7-6 7-3.3 0-6-2.7-6-6"></path>
				<path d="M20 24h8"></path>
				<path d="M14 20v8"></path>
				<path d="M34 20v8"></path>
			</svg>
		</div>
		<h3>Neural Basis of Auditory Cognition</h3>
		<p>Discovering how the brain encodes speech, language, and music in complex, naturalistic listening environments.</p>
	</article>
	<article class="research-card" tabindex="0">
		<div class="icon" aria-hidden="true">
			<svg viewBox="0 0 48 48" role="presentation">
				<path d="M10 28v-4c0-7.7 6.3-14 14-14s14 6.3 14 14v4"></path>
				<path d="M12 24h-2c-2.2 0-4 1.8-4 4v4c0 2.2 1.8 4 4 4h2v-12z"></path>
				<path d="M36 24h2c2.2 0 4 1.8 4 4v4c0 2.2-1.8 4-4 4h-2v-12z"></path>
				<path d="M18 32v4"></path>
				<path d="M30 32v4"></path>
			</svg>
		</div>
		<h3>Auditory Brain-Computer Interfaces (BCI)</h3>
		<p>Creating real-time systems that decode auditory attention from neural signals, enabling assistive hearing and communication devices.</p>
	</article>
	<article class="research-card" tabindex="0">
		<div class="icon" aria-hidden="true">
			<svg viewBox="0 0 48 48" role="presentation">
				<rect x="10" y="16" width="28" height="20" rx="6"></rect>
				<path d="M24 10v6"></path>
				<circle cx="18" cy="24" r="2.5"></circle>
				<circle cx="30" cy="24" r="2.5"></circle>
				<path d="M18 31h12"></path>
			</svg>
		</div>
		<h3>AI for Audio &amp; Brain Modeling</h3>
		<p>Building generative AI for speech and audio while using deep learning models as <em>in silico</em> platforms to probe brain computation.</p>
	</article>
</section>

<script>
	document.addEventListener('DOMContentLoaded', function () {
		var cards = document.querySelectorAll('.research-card');
		cards.forEach(function (card) {
			var triggerAnimation = function () {
				card.classList.remove('is-active');
				void card.offsetWidth;
				card.classList.add('is-active');
			};

			card.addEventListener('click', triggerAnimation);
			card.addEventListener('keydown', function (event) {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault();
					triggerAnimation();
				}
			});
		});
	});
</script>

