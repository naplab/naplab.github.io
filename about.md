---
layout: page
title: Mesgarani Lab
permalink: /about/
---

<style>
	.header-section .page-heading h1 {
		white-space: nowrap;
		font-size: clamp(2.4rem, 4vw, 3.4rem);
	}

	.about-page-wrapper {
		max-width: 960px;
		margin: 0 auto;
	}

	.about-page-wrapper p.lead {
		font-size: 1.05rem;
		line-height: 1.7;
		color: #31445e;
	}

	.research-cards {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 28px;
		margin: 32px 0 40px;
	}

	.research-card {
		background: #ffffff;
		color: #1e2d44;
		border-radius: 18px;
		padding: 28px 22px;
		border: 1px solid rgba(23, 76, 140, 0.12);
		box-shadow: 0 16px 30px rgba(17, 52, 94, 0.08);
		text-align: center;
		position: relative;
		overflow: hidden;
		cursor: pointer;
		transition: transform 160ms ease, box-shadow 200ms ease;
		outline: none;
	}

	.research-card:hover,
	.research-card:focus-visible {
		transform: translateY(-4px);
		box-shadow: 0 22px 38px rgba(17, 52, 94, 0.14);
	}

	.research-card::after {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		width: 115%;
		height: 115%;
		background: radial-gradient(circle at center, rgba(23, 76, 140, 0.12), transparent 65%);
		transform: translate(-50%, -50%) scale(0);
		transition: transform 300ms ease;
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
		width: 72px;
		height: 72px;
		border-radius: 50%;
		background: linear-gradient(135deg, rgba(23, 76, 140, 0.1), rgba(23, 76, 140, 0.02));
		box-shadow: inset 0 0 0 1px rgba(23, 76, 140, 0.16);
	}

	.research-card svg {
		width: 34px;
		height: 34px;
		fill: none;
		stroke: #174c8c;
		stroke-width: 2.2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.research-card h3 {
		font-size: 1.08rem;
		font-weight: 700;
		margin-bottom: 12px;
	}

	.research-card p {
		font-size: 0.96rem;
		line-height: 1.55;
		margin: 0;
		color: #3d5068;
	}

	@media (max-width: 1100px) {
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

	@media (max-width: 600px) {
		.header-section .page-heading h1 {
			white-space: normal;
		}
	}
</style>

<div class="about-page-wrapper">
    <p class="lead">Welcome to the <strong>Neural Acoustic Processing Laboratory</strong> at Columbia University. Our research is dedicated to understanding and engineering the future of human auditory communication, and it is built on three core pillars:</p>

    <section class="research-cards">
        <article class="research-card" tabindex="0">
            <div class="icon" aria-hidden="true" style="font-size: 3rem;">
                🧠
            </div>
            <h3>Neural Basis of Auditory Cognition</h3>
            <p>Discovering how the brain encodes speech, language, and music in complex, naturalistic listening environments.</p>
        </article>
        
        <article class="research-card" tabindex="0">
            <div class="icon" aria-hidden="true" style="font-size: 3rem;">
                🎧
            </div>
            <h3>Auditory Brain-Computer Interfaces (BCI)</h3>
            <p>Creating real-time systems that decode auditory attention from neural signals, enabling assistive hearing and communication devices.</p>
        </article>
        
        <article class="research-card" tabindex="0">
            <div class="icon" aria-hidden="true" style="font-size: 3rem;">
                🤖
            </div>
            <h3>AI for Audio &amp; Brain Modeling</h3>
            <p>Building generative AI for speech and audio while using deep learning models as <em>in silico</em> platforms to probe brain computation.</p>
        </article>
    </section>
</div>

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

