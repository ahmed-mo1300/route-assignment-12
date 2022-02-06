$(document).ready(function () {
  // cached vars
  let $root = $('html, body');
  let $nav = $('nav.nav');

  // remove loading
  setTimeout(function () {
    $('.loading')
      .fadeOut(500, function () {
        $root.css('overflow-y', 'auto');
      })
      .remove();
  }, 1000);

  // open , close navbar
  $('span.open, div.close span').click(function () {
    $nav.toggleClass('active');
  });

  // jQuery Accordion
  $('section#details p:first').css('display', 'block');
  $('section#details h3').click(function (e) {
    let selectedParagraph = $(e.target).next();
    selectedParagraph.slideToggle();
    $('section#details p').not(selectedParagraph).slideUp();
  });

  // countdown
  (function () {
    let countDownDate = new Date('Dec 31, 2023 23:59:59').getTime();

    let counter = setInterval(() => {
      // Get Date Now -- here cuz milliseconds
      let dateNow = new Date().getTime();

      // Find The Date Difference Between Now And Countdown Date
      let dateDiff = countDownDate - dateNow;

      // Get Time Units
      // let days = Math.floor(dateDiff / 1000 / 60 / 60 / 24);
      let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
      let hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);

      document.querySelector('.days').innerHTML = days < 10 ? `0${days} D` : `${days} D`;
      document.querySelector('.hours').innerHTML = hours < 10 ? `0${hours} h` : `${hours} h`;
      document.querySelector('.minutes').innerHTML = minutes < 10 ? `0${minutes} m` : `${minutes} m`;
      document.querySelector('.seconds').innerHTML = seconds < 10 ? `0${seconds} s` : `${seconds} s`;

      if (dateDiff < 0) {
        clearInterval(counter);
      }
    }, 1000);
  })();

  // chars count
  (function () {
    let $maxChars = $('textarea').attr('maxlength');
    // console.log($maxChars);

    $('textarea').on('propertychange input', function () {
      let $textAreaValue = $('textarea').val().length;
      // console.log($textAreaValue);
      let $availableCharacters = $maxChars - $textAreaValue;

      switch (true) {
        case $availableCharacters < 10:
          $availableCharacters = `00${$availableCharacters}`;
          break;
        case $availableCharacters < 100:
          $availableCharacters = `0${$availableCharacters}`;
          break;
      }
      if ($availableCharacters <= 0) {
        $('#char').text($availableCharacters).addClass('end-of-chars');
      } else {
        $('#char').text($availableCharacters).removeClass('end-of-chars');
      }
    });
  })();

  // scroll animation
  // https://stackoverflow.com/a/7717572/16107539
  $('a[href^="#"]').click(function (e) {
    let $sectionId = $(e.target).attr('href');
    if (!$sectionId) {
      $sectionId = '#home';
    }
    // console.log($sectionId);

    if ($(window).width() <= 767) {
      $nav.removeClass('active');
    }

    $root.animate(
      {
        scrollTop: $($sectionId).offset().top,
      },
      500,
    );

    return false; // to avoid any errors
  });
});
