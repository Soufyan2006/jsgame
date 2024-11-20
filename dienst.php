<?php include_once __DIR__ . '/header.php'; ?>
<?php //include_once __DIR__ . '/footer.php'; ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dienstverlening</title>
    <link href="./src/output.css" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
    body {
        position: relative;
    }

    header {}

    .container {
        position: relative;
        z-index: 1;
    }

    .box {
        z-index: 1;
    }

    #myModal {
        z-index: 50;
    }

    .modal {
        display: none;
        /* Start hidden */
    }

    .modal.hidden {
        display: none;
    }

    .modal.visible {
        display: block;
    }
    </style>
</head>

<body class="bg-gray-100">
    <div class="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <?php
        $divs = [gi
            [
                'text' => 'Teamkompas. Door samen de bedoeling en de leidende principes te bepalen geven we uw team het kompas voor de toekomst',
                'img' => 'https://via.placeholder.com/150'
            ],
            [
                'text' => 'Zelfevaluatie. Samen met het team doen we een zelfevaluatie met het Spiegelspel dat resulteert in een ontwikkelplan.',
                'img' => 'https://via.placeholder.com/150'
            ],
            [
                'text' => 'Prestatiesturing. Samen met het team bepalen we de kritische prestatie-indicatoren.',
                'img' => 'https://via.placeholder.com/150'
            ],
            [
                'text' => 'Teamplan en -evaluatie. Met het team evalueren we het "oude" plan en stellen een nieuw meerjarenplan op.',
                'img' => 'https://via.placeholder.com/150'
            ],
            [
                'text' => 'Omgevingsanalyse -en aanpak. Met het team maken we een omgevingsanalyse en bepalen we de prios voor de strategie.',
                'img' => 'https://via.placeholder.com/150'
            ],
            [
                'text' => 'Stakeholdersanalyse en -strategie. Met het team maken we een analyse van de stakeholders en bepalen we de strategie.',
                'img' => 'https://via.placeholder.com/150'
            ],
            [
                'text' => 'Processen. We bepalen de kritische processen en onderkende risicos dekken we af met maatregelen.',
                'img' => 'https://via.placeholder.com/150'
            ],
            [
                'text' => 'Projectmanagement. Wij ondersteunen uw project(team) met training, monitoring, coaching, expertise en daadkracht.',
                'img' => 'https://via.placeholder.com/150'
            ],
            [
                'text' => 'Teamontwikkeling en persoonlijke ontwikkeling. Wij helpen bij de ontwikkeling van uw team en medewerkers.',
                'img' => 'https://via.placeholder.com/150'
            ]
        ];

        foreach ($divs as $div) {
            echo '<div class="box border border-gray-300 p-4 shadow-md rounded-lg cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-300" onclick="openModal(\'' . htmlspecialchars($div['img']) . '\', \'' . htmlspecialchars($div['text']) . '\')">';
            echo '<p class="text-center mb-2">' . htmlspecialchars($div['text']) . '</p>';
            echo '<img class="mx-auto" src="' . htmlspecialchars($div['img']) . '" alt="Image">';
            echo '</div>';
        }
        ?>
    </div>

    <!-- The Modal -->
    <div id="myModal" class="modal fixed inset-0 z-50 bg-black bg-opacity-75 hidden">
        <span class="close absolute top-4 right-8 text-red text-3xl cursor-pointer"
            onclick="closeModal()">&times;</span>
        <img class="modal-content mx-auto mt-20" id="modalImage" style="max-width: 80%; max-height: 80%;">
        <div class="modal-text text-white text-center mt-4" id="modalText"></div>
    </div>

    <script>
    function openModal(imageSrc, text) {
        console.log("open")
        console.log(imageSrc)
        document.getElementById("modalText").innerText = text;
        document.getElementById("modalImage").src = imageSrc;
        const modal = document.getElementById("myModal");
        modal.classList.remove("hidden");
        modal.classList.add("visible");
    }

    function closeModal() {
        console.log("close")
        const modal = document.getElementById("myModal");
        modal.classList.remove("visible");
        modal.classList.add("hidden");
    }

    // Close the modal when clicking outside of it
    window.onclick = function(event) {
        console.log("onclick")
        const modal = document.getElementById("myModal");
        if (event.target == modal) {
            closeModal();
        }
    };
    </script>
</body>

</html>