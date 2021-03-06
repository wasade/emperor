from __future__ import division

from skbio.stats.ordination import OrdinationResults
from skbio.io import FileFormatError

from emperor.qiime_backports.parse import parse_coords as qiime_parse_coords


def parse_coords(lines):
    """Parse skbio's ordination results file into  coords, labels, eigvals,
        pct_explained.

    Returns:
    - list of sample labels in order
    - array of coords (rows = samples, cols = axes in descending order)
    - list of eigenvalues
    - list of percent variance explained

    For the file format check
    skbio.stats.ordination.OrdinationResults.read

    Strategy: read the file using skbio's parser and return the objects
              we want
    """
    try:
        pcoa_results = OrdinationResults.read(lines)
        return (pcoa_results.site_ids, pcoa_results.site, pcoa_results.eigvals,
                pcoa_results.proportion_explained)
    except FileFormatError:
        try:
            lines.seek(0)
        except AttributeError:
            # looks like we have a list of lines, not a file-like object
            pass
        return qiime_parse_coords(lines)
