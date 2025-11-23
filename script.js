/* Navigation Toggle */
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

if (navToggle) {
    navToggle.addEventListener("click", () => {
        nav.classList.toggle("show");
    });
}

/* Property Data Management */
const defaultProperties = [
    {
        id: 1,
        title: "Premium Corporate Office Floor",
        price: "PKR 15 Crore",
        location: "Shahrah-e-Faisal, Karachi",
        tag: "For Sale",
        type: "Commercial",
        size: "4,500 Sq. Ft"
    },
    {
        id: 2,
        title: "Luxury 4-Bed Apartment",
        price: "PKR 8.5 Crore",
        location: "Emaar Crescent Bay, Karachi",
        tag: "For Sale",
        type: "Residential",
        size: "2,800 Sq. Ft"
    },
    {
        id: 3,
        title: "High-Visibility Retail Showroom",
        price: "PKR 5.5 Lac/Month",
        location: "Zamzama Boulevard, DHA",
        tag: "For Rent",
        type: "Commercial",
        size: "1,200 Sq. Ft"
    },
    {
        id: 4,
        title: "Warehousing Facility",
        price: "PKR 25 Crore",
        location: "Port Qasim Industrial Area",
        tag: "For Sale",
        type: "Industrial",
        size: "10,000 Sq. Ft"
    },
    {
        id: 5,
        title: "Modern Office Suite",
        price: "PKR 2.5 Lac/Month",
        location: "Clifton Block 4, Karachi",
        tag: "For Rent",
        type: "Commercial",
        size: "1,500 Sq. Ft"
    },
    {
        id: 6,
        title: "Sea View Penthouse",
        price: "PKR 12 Crore",
        location: "Clifton, Karachi",
        tag: "For Sale",
        type: "Residential",
        size: "3,500 Sq. Ft"
    }
];

// Initialize Data
function getProperties() {
    const stored = localStorage.getItem("inamProperties");
    if (!stored) {
        localStorage.setItem("inamProperties", JSON.stringify(defaultProperties));
        return defaultProperties;
    }
    return JSON.parse(stored);
}

// Render Properties on Home Page
const propertyGrid = document.getElementById("propertyGrid");
if (propertyGrid) {
    const properties = getProperties();
    renderProperties(properties);
}

function renderProperties(items) {
    if (!propertyGrid) return;
    propertyGrid.innerHTML = items.map(prop => `
        <div class="property-card">
            <span class="property-tag">${prop.tag || 'For Sale'}</span>
            <h3 class="property-title">${prop.title}</h3>
            <div class="property-price">${prop.price}</div>
            <div class="property-location">
                <i class="fas fa-map-marker-alt"></i> ${prop.location}
            </div>
            <div class="property-meta">
                <span>${prop.type || 'Property'}</span>
                <span>${prop.size || 'N/A'}</span>
            </div>
        </div>
    `).join('');
}

// Hero Slider Logic
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlideIndex = 0;
let slideInterval;

if (slides.length > 0) {
    // Auto-advance slides
    function startSlideShow() {
        slideInterval = setInterval(() => {
            changeSlide(1);
        }, 5000); // Change slide every 5 seconds
    }

    // Change slide function
    function changeSlide(direction) {
        slides[currentSlideIndex].classList.remove('active');
        if (dots.length > 0) {
            dots[currentSlideIndex].classList.remove('active');
        }

        currentSlideIndex = (currentSlideIndex + direction + slides.length) % slides.length;

        slides[currentSlideIndex].classList.add('active');
        if (dots.length > 0) {
            dots[currentSlideIndex].classList.add('active');
        }

        // Reset interval when manually changing slides
        clearInterval(slideInterval);
        startSlideShow();
    }

    // Go to specific slide
    function currentSlide(index) {
        slides[currentSlideIndex].classList.remove('active');
        if (dots.length > 0) {
            dots[currentSlideIndex].classList.remove('active');
        }

        currentSlideIndex = index;

        slides[currentSlideIndex].classList.add('active');
        if (dots.length > 0) {
            dots[currentSlideIndex].classList.add('active');
        }

        // Reset interval when manually changing slides
        clearInterval(slideInterval);
        startSlideShow();
    }

    // Make functions global so they can be called from HTML onclick
    window.changeSlide = changeSlide;
    window.currentSlide = currentSlide;

    // Start the slideshow
    startSlideShow();
}


// Search / Filter Logic
function filterProperties() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const allProps = getProperties();
    const filtered = allProps.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.price.toLowerCase().includes(query)
    );
    renderProperties(filtered);
}

// Admin: Add Property
const addPropertyForm = document.getElementById("addPropertyForm");
if (addPropertyForm) {
    addPropertyForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const newProp = {
            id: Date.now(),
            title: document.getElementById("title").value,
            price: document.getElementById("price").value,
            location: document.getElementById("location").value,
            tag: "New Listing",
            type: "Custom",
            size: "N/A"
        };

        const props = getProperties();
        props.unshift(newProp); // Add to top
        localStorage.setItem("inamProperties", JSON.stringify(props));

        alert("Property Added Successfully!");
        window.location.href = "index.html";
    });
}

// Admin: Manage Properties
const adminPropertyList = document.getElementById("adminPropertyList");
if (adminPropertyList) {
    renderAdminProperties();
}

function renderAdminProperties() {
    const props = getProperties();
    if (props.length === 0) {
        adminPropertyList.innerHTML = '<p style="text-align:center; color:#888;">No properties found.</p>';
        return;
    }

    adminPropertyList.innerHTML = props.map(prop => `
        <div class="admin-property-item">
            <div class="admin-property-info">
                <h4>${prop.title}</h4>
                <p>${prop.price} • ${prop.location}</p>
            </div>
            <button class="btn-delete" onclick="deleteProperty(${prop.id})">Delete</button>
        </div>
    `).join('');
}

function deleteProperty(id) {
    if (confirm("Are you sure you want to delete this property?")) {
        const props = getProperties();
        const updatedProps = props.filter(p => p.id !== id);
        localStorage.setItem("inamProperties", JSON.stringify(updatedProps));
        renderAdminProperties();
    }
}
