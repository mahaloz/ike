// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="1_introduction/introduction.html"><strong aria-hidden="true">1.</strong> Introduction</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="1_introduction/background.html"><strong aria-hidden="true">1.1.</strong> Background</a></li><li class="chapter-item expanded "><a href="1_introduction/inspiration.html"><strong aria-hidden="true">1.2.</strong> Inspiration</a></li><li class="chapter-item expanded "><a href="1_introduction/overview.html"><strong aria-hidden="true">1.3.</strong> Overview &amp; Schedule</a></li></ol></li><li class="chapter-item expanded "><a href="2_operating_systems/operating_systems.html"><strong aria-hidden="true">2.</strong> Operating Systems</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="2_operating_systems/introduction.html"><strong aria-hidden="true">2.1.</strong> Introduction</a></li><li class="chapter-item expanded "><a href="2_operating_systems/virtualization.html"><strong aria-hidden="true">2.2.</strong> Virtualization</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="2_operating_systems/virtual_machines.html"><strong aria-hidden="true">2.2.1.</strong> Virtual Machines</a></li><li class="chapter-item expanded "><a href="2_operating_systems/containers.html"><strong aria-hidden="true">2.2.2.</strong> Containers</a></li></ol></li><li class="chapter-item expanded "><a href="2_operating_systems/linux_os.html"><strong aria-hidden="true">2.3.</strong> Linux OS</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="2_operating_systems/terminal.html"><strong aria-hidden="true">2.3.1.</strong> The Terminal</a></li><li class="chapter-item expanded "><a href="2_operating_systems/permissions.html"><strong aria-hidden="true">2.3.2.</strong> Permissions</a></li><li class="chapter-item expanded "><a href="2_operating_systems/hacker_practice.html"><strong aria-hidden="true">2.3.3.</strong> Hacker Practice</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="3_computer_organization/computer_org.html"><strong aria-hidden="true">3.</strong> Computer Organization</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="3_computer_organization/introduction.html"><strong aria-hidden="true">3.1.</strong> Introduction</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="3_computer_organization/math_and_counting.html"><strong aria-hidden="true">3.1.1.</strong> Math &amp; Counting</a></li><li class="chapter-item expanded "><a href="3_computer_organization/bits_and_logic.html"><strong aria-hidden="true">3.1.2.</strong> Bits &amp; Logic</a></li></ol></li><li class="chapter-item expanded "><a href="3_computer_organization/memory.html"><strong aria-hidden="true">3.2.</strong> Memory</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="3_computer_organization/programs_in_mem.html"><strong aria-hidden="true">3.2.1.</strong> Programs in Memory</a></li><li class="chapter-item expanded "><a href="3_computer_organization/addressing.html"><strong aria-hidden="true">3.2.2.</strong> Addressing</a></li><li class="chapter-item expanded "><a href="3_computer_organization/memory_segments.html"><strong aria-hidden="true">3.2.3.</strong> Memory Segments</a></li></ol></li><li class="chapter-item expanded "><a href="3_computer_organization/assembly.html"><strong aria-hidden="true">3.3.</strong> Assembly</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="3_computer_organization/registers.html"><strong aria-hidden="true">3.3.1.</strong> Registers</a></li><li class="chapter-item expanded "><a href="3_computer_organization/instructions.html"><strong aria-hidden="true">3.3.2.</strong> Instructions</a></li><li class="chapter-item expanded "><a href="3_computer_organization/asm_memory.html"><strong aria-hidden="true">3.3.3.</strong> ASM Memory</a></li><li class="chapter-item expanded "><a href="3_computer_organization/control_structures.html"><strong aria-hidden="true">3.3.4.</strong> Control Structures</a></li><li class="chapter-item expanded "><a href="3_computer_organization/hacker_practice.html"><strong aria-hidden="true">3.3.5.</strong> Hacker Practice</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="4_programming_languages/programming_languages.html"><strong aria-hidden="true">4.</strong> Programming Languages</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="4_programming_languages/introduction.html"><strong aria-hidden="true">4.1.</strong> Introduction</a></li><li class="chapter-item expanded "><a href="4_programming_languages/c.html"><strong aria-hidden="true">4.2.</strong> C</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="4_programming_languages/write_c.html"><strong aria-hidden="true">4.2.1.</strong> Writing Code</a></li><li class="chapter-item expanded "><a href="4_programming_languages/compilation.html"><strong aria-hidden="true">4.2.2.</strong> Compilation &amp; Execution</a></li><li class="chapter-item expanded "><a href="4_programming_languages/debugging_c.html"><strong aria-hidden="true">4.2.3.</strong> Debugging</a></li></ol></li><li class="chapter-item expanded "><a href="4_programming_languages/python.html"><strong aria-hidden="true">4.3.</strong> Python</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="4_programming_languages/write_py.html"><strong aria-hidden="true">4.3.1.</strong> Writing Code</a></li><li class="chapter-item expanded "><a href="4_programming_languages/interp.html"><strong aria-hidden="true">4.3.2.</strong> Interpretation &amp; Execution</a></li><li class="chapter-item expanded "><a href="4_programming_languages/debugging_py.html"><strong aria-hidden="true">4.3.3.</strong> Debugging</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="5_processes/proc_and_debug.html"><strong aria-hidden="true">5.</strong> Processes and Debugging</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="5_processes/introduction.html"><strong aria-hidden="true">5.1.</strong> Introduction</a></li><li class="chapter-item expanded "><a href="5_processes/executable_types.html"><strong aria-hidden="true">5.2.</strong> Executable Types</a></li><li class="chapter-item expanded "><a href="5_processes/gdb.html"><strong aria-hidden="true">5.3.</strong> Using GDB</a></li><li class="chapter-item expanded "><a href="5_processes/interaction.html"><strong aria-hidden="true">5.4.</strong> Interacting with Python</a></li></ol></li><li class="chapter-item expanded "><a href="6_security/security.html"><strong aria-hidden="true">6.</strong> Security Concepts</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="6_security/cia.html"><strong aria-hidden="true">6.1.</strong> CIA</a></li><li class="chapter-item expanded "><a href="6_security/enc_and_hash.html"><strong aria-hidden="true">6.2.</strong> Encryption &amp; Hashing</a></li><li class="chapter-item expanded "><a href="6_security/bruteforcing.html"><strong aria-hidden="true">6.3.</strong> Bruteforcing</a></li><li class="chapter-item expanded "><a href="6_security/dos.html"><strong aria-hidden="true">6.4.</strong> DOSing</a></li><li class="chapter-item expanded "><a href="6_security/io.html"><strong aria-hidden="true">6.5.</strong> I/O Vectors</a></li></ol></li><li class="chapter-item expanded "><a href="whats_next.html"><strong aria-hidden="true">7.</strong> What&#39;s Next</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
