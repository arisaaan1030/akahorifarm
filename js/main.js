// ハンバーガーメニューの開閉
$('.hamburger-button').on('click', function() {
    $('body').toggleClass('menu-open');
    
    // 互換性のために古いクラスも切り替え
    $('.hamburger-menu').toggleClass('hamburger-menu-active');
    
    // メニュー開閉時のスクロール制御
    if ($('body').hasClass('menu-open')) {
        // メニューを開いたときに背景スクロールを無効化
        $('body').css('overflow', 'hidden');
    } else {
        // メニューを閉じたときに背景スクロールを有効化
        $('body').css('overflow', '');
    }
});

// メニュー項目クリック時に自動的にメニューを閉じる
$('.hamburger-menu-list a').on('click', function() {
    $('body').removeClass('menu-open');
    $('.hamburger-menu').removeClass('hamburger-menu-active');
    $('body').css('overflow', '');
});

// 画面外をクリックしたらメニューを閉じる
$(document).on('click touchstart', function(e) {
    if ($('body').hasClass('menu-open') && 
        !$(e.target).closest('.hamburger-button').length && 
        !$(e.target).closest('.hamburger-menu').length) {
        $('body').removeClass('menu-open');
        $('.hamburger-menu').removeClass('hamburger-menu-active');
        $('body').css('overflow', '');
    }
});

// ウィンドウサイズに応じたメニュー表示制御
function adjustMenuByWindowSize() {
    if ($(window).width() >= 768) {
        // PCサイズでは常にメニューを表示
        $('.hamburger-menu').addClass('hamburger-menu-active');
        $('.hamburger-menu').css({
            'position': 'static',
            'right': 'auto',
            'top': 'auto',
            'width': 'auto',
            'height': 'auto',
            'opacity': '1',
            'visibility': 'visible',
            'background': 'none',
            'box-shadow': 'none',
            'padding': '0'
        });
        
        // PCサイズではハンバーガーメニューのスタイルを調整
        $('.hamburger-menu-list').css({
            'display': 'flex',
            'flex-direction': 'row',
            'margin-top': '0',
            'margin-bottom': '0',
            'gap': 'clamp(1rem, 3vw, 2.3125rem)'
        });
        
        // PCサイズではメニュー項目を全て表示
        $('.hamburger-menu-list li').css({
            'opacity': '1',
            'transform': 'none',
            'transition': 'none'
        });
    } else {
        // SPサイズで、かつメニューが閉じている場合
        if (!$('body').hasClass('menu-open')) {
            $('.hamburger-menu').removeClass('hamburger-menu-active');
            $('.hamburger-menu').css({
                'position': '',
                'right': '',
                'width': '',
                'height': '',
                'opacity': '',
                'visibility': '',
                'background': '',
                'padding': ''
            });
            
            // SPサイズでのハンバーガーメニューリセット
            $('.hamburger-menu-list').css({
                'display': '',
                'flex-direction': '',
                'margin-top': '',
                'margin-bottom': '',
                'gap': ''
            });
            
            // SPサイズでのメニュー項目リセット
            $('.hamburger-menu-list li').css({
                'opacity': '',
                'transform': '',
                'transition': ''
            });
        }
    }
}

// ページ読み込み時にメニュー調整を実行
$(document).ready(function() {
    adjustMenuByWindowSize();
});

// ウィンドウサイズ変更時にメニュー調整を実行
$(window).on('resize', function() {
    adjustMenuByWindowSize();
});

// カルーセルの設定（index.htmlのカバー画像用）
if ($('.cover-slick').length) {
    $('.cover-slick').slick({
        infinite: true,
        dots: true,
        arrows: false,
        fade: true,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        pauseOnFocus: false
    });
}

// スクロールダウンの設定（index.htmlのスクロールダウン用）
document.addEventListener("DOMContentLoaded", function () {
    let scrollText = document.querySelector(".scroll_down a");
    if (scrollText) {
        setInterval(() => {
            scrollText.classList.toggle("fade");
        }, 1000);
    }
});

// スマートタブの初期化（必要な場合のみ）
if ($('#smarttab').length) {
    $('#smarttab').smartTab({
        enableUrlHash: false
    });
}

// フェードインアニメーション
$(function() {
    // 左からのフェードイン
    $('.js-fadein-left').waypoint({
        handler: function(direction) {
            if (direction === 'down') {
                $(this.element).addClass('animate__animated animate__fadeInLeft');
            }
        },
        offset: '100%'
    });

    // 右からのフェードイン
    $('.js-fadein-right').waypoint({
        handler: function(direction) {
            if (direction === 'down') {
                $(this.element).addClass('animate__animated animate__fadeInRight');
            }
        },
        offset: '100%'
    });
});

// アコーディオン機能
$('.accordion-title').on('click', function () {
    const isExpanded = $(this).attr('aria-expanded') === 'true';
    $(this).attr('aria-expanded', !isExpanded);

    $(this).next('.accordion-content').slideToggle();
    $(this).find('.accordion-icon').toggleClass('bi-caret-down-fill bi-caret-up-fill');
});

// スクロール時のヘッダー背景変更
document.addEventListener("DOMContentLoaded", function () {
    let header = document.querySelector(".header");

    function onScroll() {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    // スクロールイベントを一定間隔で処理（throttle）
    let lastScrollTime = 0;
    window.addEventListener("scroll", function () {
        let now = Date.now();
        if (now - lastScrollTime > 100) { // 100ms間隔で実行
            onScroll();
            lastScrollTime = now;
        }
    });
});

// スムーススクロール
$(function() {
    $('.header-menu a, .hamburger-menu-list a').on('click', function(event) {
        // ページ内リンクの場合のみスムーススクロールを適用
        if (this.hash !== "") {
            event.preventDefault();
            var targetId = $(this).attr('href');
            
            // 同じページ内のリンクかどうかを確認
            if (targetId.startsWith('#')) {
                var target = $(targetId);
                if (target.length) {
                    $('html, body').animate({ scrollTop: target.offset().top - 50 }, 800);
                    
                    // ハンバーガーメニューを閉じる
                    hamburger.removeClass('hamburger-menu-active');
                    $('body').removeClass('menu-open');
                }
            }
        }
    });
});

// serviceページのタブ切り替え機能
$(document).ready(function() {
    if ($('.service-category-tabs').length) {
        // タブ切り替え
        $('.tab-nav li').click(function() {
            var tabId = $(this).data('tab');
            
            // アクティブクラスを切り替え
            $('.tab-nav li').removeClass('active');
            $(this).addClass('active');
            
            // タブコンテンツを切り替え
            $('.tab-pane').removeClass('active');
            $('#' + tabId).addClass('active');
        });
    }
});

// サービスページのフローステップアニメーション
$(window).scroll(function() {
    if ($('.flow-step').length) {
        $('.flow-step').each(function() {
            var position = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            
            if (scroll > position - windowHeight + 100) {
                $(this).addClass('visible');
            }
        });
    }
});

// serviceページ文字が落ちてくるアニメーション（元のサービスページ用）
$(function() {
    if ($('.falling-text').length) {
        $(window).on('scroll', function() {
            var windowHeight = $(window).height();
            var topWindow = $(window).scrollTop();

            $('.falling-text').each(function() {
                var targetPosition = $(this).offset().top;
                if (topWindow > targetPosition - windowHeight + 100) {
                    $(this).addClass("show");
                }
            });
        });

        // ページが読み込まれた時にも適用する
        $(window).trigger('scroll');
    }
});