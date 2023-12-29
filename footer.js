document.write(`
<footer class="bg-dark d-none">
  <div class="container-fluid text-center text-light p-5 my-5">
    <h5 class="font1 mb-2 lh-md">Want to create one for you fur pet?</h5>
    <h2 class="lh-xs my-md-4">Contact us now</h2>
    <a class="btn btn-primary mt-3" href="tel:0976-111-9647"><i class="fa fa-phone-alt"></i> 0976-111-9647</a>
  </div>
  <div class="container-fluid bg-custom1 text-light text-center py-2 px-4">
    <h6>Copyright © 2023 | <a href="../">FurFam</a></h6>
  </div>
</footer>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
`);


$(document).ready(function() {

  function fn_normalize_all(val){return val.replaceAll("Ä«", "").replaceAll("Ä", "").replaceAll("Å¡", "").replaceAll("Ä“", "").normalize("NFD").replaceAll(/[\u0300-\u036f]/g, "").replaceAll(/\s+/g, '').replaceAll("&", "").replaceAll("/", "").replaceAll("(", "").replaceAll(")", "").replaceAll("Â©","").replaceAll("Â®","").toLowerCase();}
  $('[data-toggle="tooltip"]').tooltip();
  $('.carousel').carousel()

  if ($("section, main").hasClass("works")) {

    // Retrieve files from repo
    const repo = 'reinebrow/folio';
    const directoryPath = 'projects';

    // Function to fetch commit history for a specific file
    async function getCommitHistoryForFile(filePath) {
      const response = await fetch(`https://api.github.com/repos/${repo}/commits?path=${encodeURIComponent(directoryPath + '/' + filePath)}`);
      const data = await response.json();
      return data.length > 0 ? new Date(data[0].commit.author.date) : null;
    }

    // Function to format date as 'M d, Y'
    function formatDate(date) {
      const options = { month: 'short', day: 'numeric', year: 'numeric' };
      return date ? date.toLocaleDateString('en-US', options) : null;
    }

    // Function to fetch and display file information
    async function getFileInformation(dateorder,fshow) {
      try {

        $(".project .row").empty();
        $(".project .div-btn-more").remove();
        const response = await fetch(`https://api.github.com/repos/${repo}/contents/${directoryPath}`);
        const data = await response.json();
        var ctr = 1, rint = 11, rstart = 0, rend = 0;

        // Fetch all commit dates in parallel
        const commitDates = await Promise.all(data.map(async (item) => await getCommitHistoryForFile(item.name)));

        //alert(dateorder);
        // Sort data based on commit dates in descending order
        data.sort((a, b) => {
          const dateA = commitDates[data.indexOf(a)];
          const dateB = commitDates[data.indexOf(b)];
          if (dateorder == "datedesc") return dateB - dateA;
          else if (dateorder == "dateasc") return dateA - dateB;
        });

        for (const item of data) {
          const fileName = item.name;
          const lastModified = await getCommitHistoryForFile(fileName);
          const formattedDate = formatDate(lastModified);
          const newfilepath = `/${directoryPath}/${fileName}`;
          const fileproj = fileName.split("_")[0];
          const fileheart = fileName.split(".")[0].split("_")[2] ?? 0;
          var fileshow = "";
          if (lastModified) {
            if (ctr > rint) {
              fileshow = "hide";
              if (rstart == 0) rstart = ctr;
              rend = ctr;
            }
            //files.push([`${fileName}`,[`${lastModified}`],[`${newfilepath}`]]);

            if ((fshow == "web") && (fileproj == "g")) {continue;}
            else if ((fshow == "grx") && (fileproj == "w")) {continue;}

            const message = `File: ${fileName}\nLast Modified: ${lastModified}\nPath: ${newfilepath}`;
            $(".project .row").append(`<div class="col ${fileproj} ${fileshow}" title="${fileName}"><img src=".${newfilepath}" onclick="openproject('${newfilepath}')" loading="lazy"/><div class="options"><label>${formattedDate}</label><span><i class="far fa-heart"></i>${fileheart}</span></div></div>`);
            ctr++;
          }
        }
        // var vr = rend - rstart;
        // alert(rend+" - "+rstart+" = "+vr);
        if ((parseInt(rend) - parseInt(rstart)) != 0) {
          $(".project .row").after(`<div class="div-btn-more d-flex justify-content-center"><button onclick="showmore('`+rint+`','`+rend+`','`+rstart+`')" class="btn btn-secondary btn-more">See more</button></div>`);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    // if (files) {
    //   files.sort((a, b) => {
    //     const dateA = a[1][0];
    //     const dateB = b[1][0];
    //     //return new Date(dateB) - new Date(dateA); //descending
    //     return new Date(dateA) - new Date(dateB); //ascending
    //   });
    //
    //   for (let i = 0; i < files.length; i++) {
    //     const fileName = files[i][0];
    //     const lastModified = files[i][1];
    //     const newfilepath = files[i][2];
    //     const fileproj = fileName.split("_")[0];
    //     const fileheart = fileName.split(".")[0].split("_")[2] ?? 0;
    //     $(".project .row").append(`<div class="col ${fileproj}" data-file="${fileName}" title="${lastModified}"><img src=".${newfilepath}" onclick="openproject('${newfilepath}')" loading="lazy"/><span><i class="far fa-heart"></i>${fileheart}</span></div>`);
    //   }
    // }

    // Call the function to get file information
    getFileInformation("datedesc","all");


    $(".modal .modal-close").click(function() {
      $(this).closest(".modal").modal("hide");
    });

    $(".filter-btn.filter-sort > span").click(function() {
      var filshow = $(".filter-show").val();
      var filorder = $(this).attr("data-src");

      if ($(this).hasClass("filter-sort-asc")) {
        $(this).addClass("d-none").siblings(".filter-sort-desc").removeClass("d-none");
        getFileInformation(filorder,filshow);
      }
      else {
        $(this).addClass("d-none").siblings(".filter-sort-asc").removeClass("d-none");
        getFileInformation(filorder,filshow);
      }
    });


    $(".filter-btn.filter-view > span").click(function() {
      if ($(this).hasClass("filter-view-grid")) {
        $(this).addClass("d-none").siblings(".filter-view-masonry").removeClass("d-none");
        $(".project").removeClass("masonry").addClass("grid");
      }
      else {
        $(this).addClass("d-none").siblings(".filter-view-grid").removeClass("d-none");
        $(".project").removeClass("grid").addClass("masonry");
      }
    });

    $("#modalproject .arrows > span").click(function() {
      var thisgo = $(this).attr("data-src").slice(1);
      openproject(thisgo);
    });


    $(".filter-show").change(function() {
      var fshow = $(this).val();
      var filorder = $(".filter-btn > span:not(.d-none)").attr("data-src");

      getFileInformation(filorder,fshow);

      // $(".project[class*='show-']").removeClass(function(index, className) {
      //   const matchedClass = className.match(/\bshow-\S*/);
      //   return (matchedClass || []).join(' ');
      // });
      // $(".project").addClass("show-"+fshow);

    });


    $(document).keydown(function(e) {
      if (e.keyCode === 27) {
        $("#modalproject").modal("hide");
      }

      if ($('#modalproject').is(':visible')) {
        if (e.repeat) {return;}
        if (e.keyCode === 37) {
          $("#modalproject .arrows > span.prev").click();
        } else if (e.keyCode === 39) {
          $("#modalproject .arrows > span.next").click();
        }
      }

    });

  }

});

//FUNCTIONS

function openproject(val) {
  $("#modalproject .modal-body").empty();
  $("#modalproject .modal-body").html("<img src='."+val+"' />");

  var prevsrc = $(".project .col:has(+ .col:not(.hide) img[src='."+val+"']) img").attr("src");
  var nextsrc = $(".project .col:has(img[src='."+val+"']) + .col:not(.hide) img").attr("src");
  $("#modalproject .arrows .prev").removeClass("d-hide").attr("data-src",prevsrc);
  $("#modalproject .arrows .next").removeClass("d-hide").attr("data-src",nextsrc);

  $("#modalproject").modal("show");
  if (prevsrc == undefined) { $("#modalproject .arrows .prev").addClass("d-hide"); }
  if (nextsrc == undefined) { $("#modalproject .arrows .next").addClass("d-hide"); }


}


function showmore(rint,rend,rstart) {
  var rnxt = parseInt(rstart) + parseInt(rint) - 1;
  //alert("rint: "+rint+"\nrend: "+rend+"\rstart: "+rstart+"\nrnxt: "+rnxt);
  $(".project .col.hide:nth-child(n + "+rstart+"):nth-child(-n + "+rnxt+")").removeClass("hide");
  rstart = rnxt+1;
  $(".project .btn-more").attr("onclick","showmore('"+rint+"','"+rend+"','"+rstart+"')");
  if (rstart > rend) { $(".project .div-btn-more").remove(); }
}
