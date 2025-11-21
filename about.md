---
layout: page
title: NapLab @ Columbia
subtitle: 
---

Welcome to the Neural Acoustic Processing Laboratory at Columbia University. Our research is dedicated to understanding and engineering the future of human auditory communication, and it is built on three core pillars:

<style>
	.research-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 28px;
		margin: 32px 0 40px;
	}

	.research-card {
		background: linear-gradient(160deg, #174c8c 0%, #0b2f57 100%);
		color: #f5fbff;
		border-radius: 22px;
		padding: 32px 26px;
		box-shadow: 0 18px 36px rgba(15, 46, 87, 0.22);
		text-align: center;
		position: relative;
		overflow: hidden;
		cursor: pointer;
		transition: transform 180ms ease, box-shadow 180ms ease;
		outline: none;
	}

	.research-card:hover,
	.research-card:focus-visible {
		transform: translateY(-6px);
		box-shadow: 0 22px 44px rgba(15, 46, 87, 0.28);
	}

	.research-card::after {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		width: 140%;
		height: 140%;
		background: radial-gradient(circle at center, rgba(76, 184, 255, 0.35), transparent 62%);
		transform: translate(-50%, -50%) scale(0);
		transition: transform 320ms ease;
		pointer-events: none;
	}

	.research-card.is-active::after {
		transform: translate(-50%, -50%) scale(1);
	}

	.research-card .icon {
		font-size: 42px;
		margin-bottom: 18px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 70px;
		height: 70px;
		border-radius: 32px;
		background: rgba(245, 251, 255, 0.14);
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
	}

	.research-card h3 {
		font-size: 1.15rem;
		font-weight: 700;
		margin-bottom: 14px;
	}

	.research-card p {
		font-size: 0.98rem;
		line-height: 1.55;
		margin: 0;
		color: rgba(245, 251, 255, 0.92);
	}

	@media (max-width: 540px) {
		.research-card {
			padding: 28px 22px;
		}

		.research-card h3 {
			font-size: 1.05rem;
		}
	}
</style>

<section class="research-cards">
	<article class="research-card" tabindex="0">
		<div class="icon" aria-hidden="true">🧠</div>
		<h3>Neural Basis of Auditory Cognition</h3>
		<p>Discovering how the brain encodes speech, language, and music in complex, naturalistic listening environments.</p>
	</article>
	<article class="research-card" tabindex="0">
		<div class="icon" aria-hidden="true">🎧</div>
		<h3>Auditory Brain-Computer Interfaces (BCI)</h3>
		<p>Creating real-time systems that decode auditory attention from neural signals, enabling assistive hearing and communication devices.</p>
	</article>
	<article class="research-card" tabindex="0">
		<div class="icon" aria-hidden="true">🤖</div>
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

